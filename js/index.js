	/*
	{
		"name": "",
		"description": "",
		"link": "",
		"img": []
	}
	*/
	import { getTags, handleCards } from "./module/module.js";
	
	const d = document;
		var allTags = null,
		cursos = null;
	fetch('../js/data/cursos.json')
		.then(res => res.json())
		.then(data => {
			cursos = data;
			handleCards(data)
		})
		.catch(error =>{
			console.log(error)
		})
