const express = require('express')
const app=express()

const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db,a;

MongoClient.connect('mongodb://localhost:27017/Inventory',(err,database) => {
	if(err) return console.log(err)

	db = database.db('Inventory')
    app.listen(5000, () => {
	    console.log('Listening to port: 5000')
    })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/',(req,res) => {
	db.collection('Attendance').find().toArray((err,result) => {
		if(err) return console.log(err)

		res.render('homepage.ejs', {data: result})
	})
})

app.get('/add',(req,res) => {
	res.render('addStudent.ejs')
})

app.get('/update',(req,res) => {
	res.render('updateStudent.ejs')
})

app.get('/delete',(req,res) => {
	res.render('deleteStudent.ejs')
})


app.post('/AddData',(req,res) => {
	db.collection('Attendance').save(req.body,(err,result) => {
		if(err) return console.log(err)

			res.redirect('/')
	})
})

app.post('/UpdateData',(req,res) => {
	db.collection('Attendance').findOneAndUpdate({rollno : req.body.rollno},{$set: {attendance : req.body.attendance}},(err,result) => {
		if(err) return res.send(err)

		console.log(req.body.rollno + " updated successfully")
	    res.redirect('/')
	})
})

app.post('/DeleteData',(req,res) => {
	db.collection('Attendance').findOneAndDelete({rollno : req.body.rollno},(err,result) => {
		if(err) return res.send(err)

		console.log(req.body.rollno + " deleted successfully")
	    res.redirect('/')
	})
})