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
		let filterDataRandom = data.sort(function() {return Math.random() - 0.5});
			handleCards(filterDataRandom)
		})
		.catch(error =>{
			console.log(error)
		})
