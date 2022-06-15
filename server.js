const express = require('express')
const app = express()
const port = process.env.port || 8000

var busses = []
var busID = 99
var reviews = []
var reviewID = 12
var photos = []
var photoID = 9

app.use(express.json())

app.use(function(req,res,next){
    console.log("Request received")
    console.log("METHOD:",req.method)
    console.log("URL:",req.url)
    console.log("HEADERS:",req.headers)
    next()
})

app.get('/', function(req,res,next){
    res.status(200).send({
        msg: "Hello World!!!!!"
    })
})

//LIST businesses
app.get('/businesses',function(req,res,next){
    res.status(200).send({
        businessses: [
            {
                "name": "Sierra",
                "addr": "960 SW Washington Ave",
                "city": "Corvallis",
                "State": "OR",
                "zip": "97333",
                "phone": "503-655-7989",
                "category": "apartment",
                "sub-category": "off-campus",
                "website": "https://sierrahousing.com",
                "email": "sierra@corvallishousing.gmail"
            },
            {
                "name": "Veterans Shelter",
                "addr": "960 SW Washington Ave",
                "city": "Corvallis",
                "State": "OR",
                "zip": "97464",
                "phone": "503-655-7989",
                "category": "shelter",
                "sub-category": "off-campus",
                "website": "https://veteranshousing.com",
                "email": "veterans@corvallishousing.gmail"
            },
        ]
    })
})

//ADD business
app.post('/businesses',function(req,res,next){
 //   console.log("req.body: ",req.body)
    busID++
    if(req.body && req.body.name && req.body.addr){
        busses.push(busID)
        res.status(201).send({
            id: busID.toString()
        })
    }
    else{
        res.status(400).send({
            err: "Request needs correct JSON body"
        })
    }
    next()
})

//MODIFY business
app.put('/businesses/:id',function(req,res,next){
    console.log("req.params:", req.params)
    const id = req.params.id.toString()
    if(busses.indexOf(parseInt(id)) != -1){
        if(req.body && req.body.name && req.body.addr){
            res.status(201).send({
                links: {
                    business: '/businesses/' + id
                }
            })
        }
        else{
            res.status(400).send({
                err: "Request needs correct JSON body"
            })
        }
    }
    else{ 
        next()
    }
})

//REMOVE business
app.delete('/businesses/:id', function(req,res,next){
    const id = req.params.id
    if(busses.indexOf(parseInt(id)) != -1){
        busses[busses.indexOf(parseInt(id))] = null
        res.status(204).send({
            msg: "Deleted"
        })
    }
    else{
        next()
    }
})

//View business
app.get('/businesses/:id', function(req,res,next){
    console.log("req.params:", req.params)
    const id = req.params.id
    if(busses.indexOf(parseInt(id)) != -1){
        res.status(200).send({
            "name": "Veterans Shelter",
            "addr": "960 SW Washington Ave",
            "city": "Corvallis",
            "State": "OR",
            "zip": "97464",
            "phone": "503-655-7989",
            "category": "shelter",
            "sub-category": "off-campus",
            "website": "https://veteranshousing.com",
            "email": "veterans@corvallishousing.gmail",
            "reviews": [
                {
                    "id": 12,
                    "starrating": 4,
                    "dollarrating": 3
                }
            ],
            "photos": [
                {
                    "id": 9,
                    "caption": "A shelter for the elderly"
                }
            ]
        })
    }
    else{ 
        next()
    }
})

//Add review
app.post('/reviews', function(req,res,next){
    reviewID++
    if(req.body && req.body.businessID){
        if(busses.indexOf(req.body.businessID) != -1){
            reviews.push(reviewID)
            res.status(201).send({
                id: reviewID.toString()
            })
        }
        else{
            res.status(400).send({
                err: "Business does not exist"
            })
        }
    }
    else{
        res.status(400).send({
            err: "Request needs correct JSON body"
        })
    }
    next()
})

//Modify review
app.put('/reviews/:id',function(req,res,next){
    const id = req.params.id.toString()
    if(reviews.indexOf(parseInt(id)) != -1){
        if(req.body && req.body.businessID){
            res.status(201).send({
                links: {
                    review: '/reviews/' + id
                }
            })
        }
        else{
            res.status(400).send({
                err: "Request needs correct JSON body"
            })
        }
    }
    else{ 
        next()
    }
})

//Remove a review
app.delete('/reviews/:id',function(req,res,next){
    const id = req.params.id
    if(reviews.indexOf(parseInt(id)) != -1){
        reviews[reviews.indexOf(parseInt(id))] = null
        res.status(204).send({
            msg: "Deleted review"
        })
    }
    else{
        next()
    }
})

//Add Photo
app.post('/photos',function(req,res,next){
    photoID++
    if(req.body && req.body.businessID){
        if(busses.indexOf(req.body.businessID) != -1){
            photos.push(photoID)
            res.status(201).send({
                id: photoID.toString()
            })
        }
        else{
            res.status(400).send({
                err: "Business does not exist"
            })
        }
    }
    else{
        res.status(400).send({
            err: "Request needs correct JSON body"
        })
    }
    next()
})

//Remove photo
app.delete('/photos/:id',function(req,res,next){
    const id = req.params.id
    if(photo.indexOf(parseInt(id)) != -1){
        photos[photos.indexOf(parseInt(id))] = null
        res.status(204).send({
            msg: "Deleted photo"
        })
    }
    else{
        next()
    }
})

//Modify photo caption
app.put('/photos/:id',function(req,res,next){
    const id = req.params.id.toString()
    if(photos.indexOf(parseInt(id)) != -1){
        if(req.body && req.body.businessID){
            res.status(201).send({
                links: {
                    photo: '/photos/' + id
                }
            })
        }
        else{
            res.status(400).send({
                err: "Request needs correct JSON body"
            })
        }
    }
    else{ 
        next()
    }
})

//LIST user's businesses
app.get('/users/:id/businesses',function(req,res,next){
    const id = req.params.id
    if(id == 'Tim'){
        res.status(200).send({
            businessses: [
                {
                    "name": "Sierra",
                    "addr": "960 SW Washington Ave",
                    "city": "Corvallis",
                    "State": "OR",
                    "zip": "97333",
                    "phone": "503-655-7989",
                    "category": "apartment",
                    "sub-category": "off-campus",
                    "website": "https://sierrahousing.com",
                    "email": "sierra@corvallishousing.gmail"
                },
            ]
        })
    }
    else{
        res.status(400).send({
            err: "There is no user with that name"
        })
    }
})

//LIST user's photos
app.get('/users/:id/photos',function(req,res,next){
    const id = req.params.id
    if(id == 'Tim'){
        res.status(200).send({
            photos: [
                {
                   "id": 10,
                   "caption": "Front entrance"
                },
                {
                    "id": 11,
                    "caption": "Garage"
                },
                {
                    "id": 12,
                    "caption": "Parking Lot"
                },
            ]
        })
    }
    else{
        res.status(400).send({
            err: "There is no user with that name"
        })
    }
})

//LIST user's reviews
app.get('/users/:id/reviews',function(req,res,next){
    const id = req.params.id
    if(id == 'Tim'){
        res.status(200).send({
            reviews: [
                {
                   "id": 13,
                   "businessID": 100,
                   "starrating": 5,
                   "dollarrating": 3,
                   "written review": "This place is 15 minutes from campus"
                },
                {
                    "id": 14,
                    "businessID": 100,
                    "starrating": 4,
                    "dollarrating": 2,
                    "written review": "This place is a long walk from campus"
                },
            ]
        })
    }
    else{
        res.status(400).send({
            err: "There is no user with that name"
        })
    }
})

app.use('*', function(req,res,next){
    res.status(404).send({
        err: "This URL was not recognized: " + req.originalUrl
    })
})

app.use(function(err,req,res,next){
    console.log("-err: ",err)
    res.status(500).send()
})

app.listen(port,function(){
    console.log("Server listening on port: ", port)
})