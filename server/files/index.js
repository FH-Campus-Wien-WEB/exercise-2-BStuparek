        window.onload = function () {
            const xhr = new XMLHttpRequest()
            xhr.onload = function () {
                const bodyElement = document.querySelector("body")
                if (xhr.status == 200) {

                    const movies = JSON.parse(xhr.responseText);
                    function createMovieCard(movie){
                        const article = document.createElement("article");
                        article.id = movie.imdbID;

                        //Poster
                        const image = document.createElement("img");
                        image.src = movie.Poster;
                        image.style.width = "300px";

                        //Title
                        const title = document.createElement("h1");
                        title.textContent = movie.Title;

                        //Edit Button
                        const edit = document.createElement("button")
                        edit.textContent = "edit"
                        edit.onclick = function(){
                          location.href = 'edit.html?imdbID=' + article.id;
                        }

                        //runtime and Release
                        const runtimeRelease = document.createElement("p");
                        runtimeRelease.textContent = 'Runtime ' + (movie.Runtime) + ' - Released on ' + (movie.Released);

                        //genres
                        const genres = document.createElement("p");
                        for(const genre of movie.Genres){
                            const span = document.createElement("span");
                            span.classList.add("genre");
                            span.textContent = genre;
                            genres.appendChild(span);
                        }

                        //Plot
                        const plot = document.createElement("p");
                        plot.textContent = movie.Plot;

                        //Directors
                        const directorTitle = document.createElement("h3");
                        directorTitle.textContent = "Directors";

                        const directorList = document.createElement("ul")
                        for(const director of movie.Directors){
                            const listElement = document.createElement("li");
                            listElement.textContent = director;
                            directorList.appendChild(listElement);
                        }
                        //Writers
                        const writerTitle = document.createElement("h3");
                        writerTitle.textContent = "Writers";

                        const writerList = document.createElement("ul");
                        for(const writer of movie.Writers){
                            const listElement = document.createElement("li");
                            listElement.textContent = writer;
                            writerList.appendChild(listElement);
                        }
                        //Actors
                        const actorTitle = document.createElement("h3");
                        actorTitle.textContent = "Actors";

                        const actorList = document.createElement("ul");
                        for(const actor of movie.Actors){
                            const listElement = document.createElement("li");
                            listElement.textContent = actor;
                            actorList.appendChild(listElement); 
                        }
                        article.appendChild(image);
                        article.appendChild(title);
                        article.appendChild(edit)
                        article.appendChild(runtimeRelease);
                        article.appendChild(genres)
                        article.appendChild(plot);
                        article.appendChild(directorTitle);
                        article.appendChild(directorList);
                        article.appendChild(writerTitle);
                        article.appendChild(writerList);
                        article.appendChild(actorTitle);
                        article.appendChild(actorList);

                        bodyElement.appendChild(article);
                    }
                    for(const movie of movies){
                        createMovieCard(movie);
                    }
                } else {
                    bodyElement.append("Daten konnten nicht geladen werden, Status " + xhr.status + " - " + xhr.statusText)
                }
            }
            xhr.open("GET", "http://localhost:3000/movies")
            xhr.send()
        }