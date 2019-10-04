$(function() {
    $("#pokemonInfoCard").hide();

    $("#search").click(function() {
        let pokemonNameOrId = $("#inputID").val().toLowerCase();
        $("#inputID").val("");
        $("#pokemonInfoList").html("");
        getPokemonInfo(pokemonNameOrId);
    });

    $("#inputID").keydown(function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            let pokemonNameOrId = $("#inputID").val().toLowerCase();
            $("#inputID").val("");
            $("#pokemonInfoList").html("");
            getPokemonInfo(pokemonNameOrId);
        }
    });

    function determineBackgroundColor(type) {
        switch (type) {
            case "bug":
                return "#A6B51D";
            case "dark":
                return "#4D392C";
            case "dragon":
                return "#735CDB";
            case "electric":
                return "#FCBB17";
            case "fairy":
                return "#EFA8EF";
            case "fighting":
                return "#7E321B";
            case "fire":
                return "#EA3E0D";
            case "flying":
                return "#9DAEF7";
            case "ghost":
                return "#5F5FB2";
            case "grass":
                return "#72C235";
            case "ground":
                return "#D1B055";
            case "ice":
                return "#6DD3F5";
            case "normal":
                return "#B8B1A6";
            case "poison":
                return "#924593";
            case "psychic":
                return "#EA457E";
            case "rock":
                return "#A68E44";
            case "steel":
                return "#B3B3C2";
            case "water":
                return "#2079D2";
            default:
                return "#000";
        }
    }

    function getPokemonInfo(nameOrId) {
        // Connect to the web server & get a response.
        // Do this with the response.

        // We need a way to asynchronously handle making the API call and doing stuff when we get a response since we don't know how long it will take to get a response.

        $.ajax({
            // The URL we're making the request to.
            url: "https://pokeapi.co/api/v2/pokemon/" + nameOrId,
            // The type of our request.
            types: "GET",
            // The function we pass in here will be called if our request is successful.
            success: function(result) {
                let name = result.name;

                let spriteLink = result.sprites.front_default;

                let id = result.id;

                let weight = result.weight;

                let types = result.types;


                $("#pokemonName").html(name.toUpperCase());
                $("#pokemonImage").attr("src", spriteLink);
                $("#pokemonInfoList").append("<li class='list-group-item'>ID: " + id + "</li");
                $("#pokemonInfoList").append("<li class='list-group-item'>Weight: " + weight + "</li");

                for (type of types) {
                    let li = document.createElement("li");
                    li.classList.add("list-group-item");
                    li.classList.add("text-capitalize");
                    li.innerHTML = type.type.name;
                    li.style.backgroundColor = determineBackgroundColor(type.type.name);

                    $("#pokemonInfoList").append(li);
                }

                $("#pokemonInfoCard").show();
            },
            // The function we pass in here will be called if our request fails.
            error: function(error) {
                console.log(error);
            }

        });
    }

}); 

