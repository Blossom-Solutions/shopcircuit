const {db,admin} = require('../util/admin')
const config = require('../util/config');
const { response } = require('express')

exports.getAllProducts = (req,res)=>{
    db
    .collection('products')
    .orderBy('title','desc')
    .get()
    .then((data)=>{
        let products = []
        data.forEach((doc)=>{
            products.push({
                productId:doc.id,
                title:doc.data().title,
                description:doc.data().description,
                price:doc.data().price,
                img:doc.data().img,
                categories:doc.data().categories,
            })
        })
        return res.json(products)
    })
    .catch((err)=>{
        console.error(err)
        return res.status(500).json({error:err.code})
    })
}

exports.postProduct = (req,res)=>{
    const newProduct = {
        title:req.body.title,
        price:req.body.price,
        img:'',
        description:req.body.description,
        categories:req.body.categories,
    }
    db
    .collection('products')
    .add(newProduct)
    .then((doc)=>{
        const responseProduct = newProduct
        responseProduct.productId = doc.id
        return res.json(responseProduct) 
    })
    .catch((err)=>{
        res.status(500).json({error:'Something went wrong'})
        console.error(err)
    })
}

exports.deleteProduct = (req,res)=>{
    const document = db.doc(`/products/${req.params.id}`)
    document
    .get()
    .then((doc)=>{
        if(!doc.exists){
            return res.status(404).json({error:'not found'})
        }
        return document.delete()
    })
    .then(()=>{
        res.json({message:'Delete Successful'})
    })
    .catch(err=>{
        console.error(err);
        return response.status(500).json({error:err.code})
    })
}

exports.editProduct = (req,res)=>{
    let document = db.doc(`/products/${req.params.id}`)
    document.update(req.body)
    .then(()=>res.json({message:'update successful'}))
    .catch(err=>{
        console.error(err)
        return res.status(500).json({error:err.code})
    })
}

deleteImage = image=>{
    const bucket = admin.storage().bucket()
    const path = `${image}`
    return bucket
    .file(path)
    .delete()
    .then(()=>{
        return
    })
    .catch((err)=>{
        return
    })
}

exports.uploadProductPhoto = (req,response)=>{
    const BusBoy = require('busboy');
	const path = require('path');
	const os = require('os');
	const fs = require('fs');
	const busboy = new BusBoy({ headers: req.headers });

	let imageFileName;
	let imageToBeUploaded = {};

	busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
		if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
			return response.status(400).json({ error: 'Wrong file type submited' });
		}
		const imageExtension = filename.split('.')[filename.split('.').length - 1];
        imageFileName = `${req.params.id}.${imageExtension}`;
		const filePath = path.join(os.tmpdir(), imageFileName);
		imageToBeUploaded = { filePath, mimetype };
		file.pipe(fs.createWriteStream(filePath));
    });
    deleteImage(imageFileName);
	busboy.on('finish', () => {
		admin
			.storage()
			.bucket()
			.upload(imageToBeUploaded.filePath, {
				resumable: false,
				metadata: {
					metadata: {
						contentType: imageToBeUploaded.mimetype
					}
				}
			})
			.then(() => {
				const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
				return db.doc(`/products/${req.params.id}`).update({
					img:imageUrl
				});
			})
			.then(() => {
				return response.json({ message: 'Image uploaded successfully' });
			})
			.catch((error) => {
				console.error(error);
				return response.status(500).json({ error: error.code });
			});
	});
	busboy.end(req.rawBody);
};

exports.getSingle = (req,res)=>{
    db
    .doc(`/products/${req.params.id}`)
    .get()
    .then(doc =>{
        if(!doc.exists){
            return res.status(404).json({error:'Not Found'})
        }
        let productData = doc.data()
        return res.json(productData)
    })
}