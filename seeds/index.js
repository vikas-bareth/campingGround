const mongoose = require('mongoose')
const Campground = require('../models/campgrounds')
const {places, descriptors} = require('./seedHelper')
const cities = require('./cities')
const axios = require('axios');

mongoose.connect('mongodb://127.0.0.1:27017/campingGrounds',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedImg = async() => {
    try {
        const resp = await axios.get('https://api.unsplash.com/photos/random',{
            params:{
                client_id:'UxarpWwwV_Cd57n348X75xfMnw2dRE-b2eEwfth6rrk',
                collections: 1114848
            }
        })
        return resp.data.urls.regular
    } catch(err) {
        console.error(err)
    } 
}



const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i<49;i++){

        const random1000 = Math.floor(Math.random() * 1000);
        const randomPrice = Math.floor(10 + Math.random()* 20)
        const camp = new Campground({
            author:'63f5d72fb292221a1a0d0348',
            location:`${cities[random1000].city}, ${cities[random1000].state} `,
            title:`${sample(descriptors)}, ${sample(places)}`,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]
          },  
            description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil tempora vel aspernatur quod aliquam illum! Iste impedit odio esse neque veniam molestiae eligendi commodi minus, beatae accusantium, doloribus quo!',
            price:randomPrice,
            images:[
                {
                  url: 'https://res.cloudinary.com/abbajabba/image/upload/v1675179635/campGrounds/h67hien9jw5j4tdcfheg.jpg',
                  filename: 'campGrounds/h67hien9jw5j4tdcfheg',
                },
                {
                  url: 'https://res.cloudinary.com/abbajabba/image/upload/v1675179637/campGrounds/dzuaxuieazsjqimk0cwg.jpg',
                  filename: 'campGrounds/dzuaxuieazsjqimk0cwg',
                },
                {
                  url: 'https://res.cloudinary.com/abbajabba/image/upload/v1675179637/campGrounds/j4jve9lpnwoftqhvpuwp.avif',
                  filename: 'campGrounds/j4jve9lpnwoftqhvpuwp',
                },
                {
                  url: 'https://res.cloudinary.com/abbajabba/image/upload/v1675179638/campGrounds/gyplmhegqxmgcifdjhmj.avif',
                  filename: 'campGrounds/gyplmhegqxmgcifdjhmj',
                }
              ]
        })
        
    await camp.save();
    }



}

seedDB().then(() => {
    mongoose.connection.close();
})

