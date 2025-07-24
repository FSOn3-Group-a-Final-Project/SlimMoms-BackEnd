import Product from "../db/models/product.js";

export const getFilteredProducts = async (req,res) => {
    try {
        const {search} = req.query;
        let products;
        if(search){
            //search paramateresi varsa title a göre filtrele (case-insensitive) RegExp,  metin arama ve eşleştirme işlemleri yapmak için 
            const regex = new RegExp(search,'i'); // i -> case insensitive (küçük-büyük harf farkı olmadan arama yapılması için)
            products = await Product.find({title:{$regex:regex}});
        }else {
            // parametre yoksa tüm ürünleri getir
            products= await Product.find();
        }
         res.status(200).json(products);
    } catch (error) {
        console.error('Ürün arama hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
    }
};