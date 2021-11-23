import { handleCards, getTags } from "./module/module.js";

let allTags = null,
	cursos = null,
	params = new URLSearchParams(location.search),
	id = params.get('id');
	id == null ? location.href="../" : "";

fetch('../js/cursos.json')
	.then(res => res.json())
	.then(data => {


		allTags = data.filter((curse) => {
			for (let i = 0; i < curse.idTags.length; i++) {
				if (curse.idTags[i] == id) {
					return true
				}
			}
		})
		handleCards(allTags)
	})