		import { handleCards, getTags } from "./module/module.js";

		let curses = null,
			params = new URLSearchParams(location.search),
			id = params.get('id'),
			query = params.get("q"),
			count = 0;
			console.log(id)
			id == null && query == null ? location.href = "../" : "";

		if (id != null) {

			fetch('../js/data/cursos.json')
				.then(res => res.json())
				.then(data => {


					curses = data.filter((curse) => {
						for (let i = 0; i < curse.idTags.length; i++) {
							if (curse.idTags[i] == id) {
								return true
							}
						}
					})
					let allTags = JSON.parse(localStorage.getItem("tags"));

					for (let i = 0; i < allTags.length; i++) {
						if (allTags[i].id == id) {
							document.querySelector(".wrap-title").innerHTML = `<h1>Coincidencia con la etiqueta <div class="wrap-line" style="position: relative;">${allTags[i].tag}<div class="line" style="background: ${allTags[i].color}"></div></div></h1>`;
						}
					}
					handleCards(curses)
				})
		} else if (query != null) {
			query = query.replace(/[-]/g, " ").trim().toLowerCase()
			query = query.split(" ")
			fetch("../js/data/cursos.json")
				.then(res => res.json())
				.then(data => {
				let dataFilter = [];
					if (query[0] != '') {

						dataFilter = data.filter((item) => {
							let nameSlipt = item.name.toLowerCase().replace(/[^\w\s]/gi, "").trim().split(" ");

							for (let i = 0; i < nameSlipt.length; i++) {
								for (let k = 0; k < query.length; k++) {

									if (nameSlipt[i] == query[k]) {
										return true
									}
								}
							}
						})
					}

					handleCards(dataFilter)

				})
		}