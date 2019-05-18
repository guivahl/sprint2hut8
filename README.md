# sprint2hut8
a CRUD made with Node.js

Ferramentes utilizadas:
	MongoDB
	Atlas
	Express
	Body-parser
	Postman
	Nodemon
	Bootstrap
	Fontawesome
	Bcrypt
  Dotenv
  EJS
  Passport 
  
Com interface:
  http://localhost:3000/

Sem interface usando Postman:
Create one:
	http://localhost:3000/posts/
	Usar a opção POST do Postman
	Modificar o body do JSON da seguinte forma:
	{
    		"name": "nomedesejado",
    		"description": "descricao",
    	"date": objetivo do tipo data
		}	
	atributos name e description são required.
	SEND!

Read one:
	Usar a opção GET do Postman
	http://localhost:3000/posts/<id do post>
	SEND!

Read all:
	Usar a opção GET do Postman
	http://localhost:3000/posts/
	SEND!

Update one:
	Usar a opção PATCH do Postman
	http://localhost:3000/posts/<id do post>
	Modificar o body do JSON da seguinte forma:
	{
    		"name": "nomedesejado",
    		"description": "descricao"
	}
	SEND!

Delete one:
	Usar a opção DELETE do Postman
	http://localhost:3000/posts/<id do post>
	SEND!		
