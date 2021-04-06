const API = 
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const form = document.getElementById("form")
const main = document.getElementById("main")
const search = document.getElementById("search")
	
// most popular movies at the beginning
getMovie(API);	

async function getMovie(url){
	let content = await fetch(url);
	let moviesList = await content.json();
	
	console.log(moviesList);
	showMovies(moviesList.results);
}

function showMovies(movies){
	main.innerHTML = "";
	
	movies.forEach(eachOne);
	function eachOne(item){
		let poster_path = item.poster_path, title, overview, vote_average;
		if(poster_path){
		    title = item.title;
		    overview = item.overview;
			vote_average = item.vote_average
	    
	// movies.forEach((item) => {
		// let {poster_path, title, overview, vote_average} = item;
	
	    let movieElement = document.createElement("div");
		movieElement.classList.add("movie");
		
		movieElement.innerHTML = `
		   <img 
		       src = "${IMGPATH + poster_path}"
		       alt = "${title}"
			   width = 100%
		   />
		   <div class = "title-rate">
		       <h3>${title}</h3>
		       <span class = "${ratingColor(vote_average)}">
			       ${vote_average}
		       </span>
		   </div>
		   <div class = "overview">
		       <h3>Overview:</h3>
		       ${overview}
		   </div>
		`;
		
		main.appendChild(movieElement);
		}}
}

function ratingColor(vote){
	if (vote >= 8){
		return "green";
	}
	else if (vote >= 5){
		return "yellow";
	}
	else return "red";
	
}

form.addEventListener("submit", function (e){
	e.preventDefault();
	let val = search.value;
	if(val){
		getMovie(SEARCHAPI + val);
		search.value = "";
	}
});
	
