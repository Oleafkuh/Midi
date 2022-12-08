// function APOD_example(){

//     // Set up Paramaters
    // url = "https://api.nasa.gov/planetary/apod"
    // key = "OsXUoFSAAt979iPqsO8wgC6vdcaZxQk9rs3maja1 "
    //     // The date format is YYYY-MM-DD
    // date = "2022-11-20" // The default if date is not provided is today
    // start_date = "2021-09-27"
    // end_date = "2022-09-27"
    // count = 3
    // thumbs = false
    // api_key = key
    // params = {"date": date,
    //             "api_key": key
    //                     }
    // // api call and log response

    // $.ajax({
    //     url: url,
    //     type: "GET",
    //     data: params,
    //     success: function(resp){
    //         console.log(resp);

    //         // Print the image next to the button

    //         // let newOBJ = document.createElement("img");
    //         // newOBJ.src = resp['url']
    //         // newOBJ.style.width = "250px"
    //         // const apod = document.getElementById('APOD_bin');
    //         // apod.appendChild(newOBJ);


    //     },
    //     error: function(error){
    //         console.log(error)
    //     }
    // });
    


//Asteroids - NeoWs example

function asteroid(){

    // Set up Paramaters

    url = "https://api.nasa.gov/neo/rest/v1/feed?" 
    key = "6ZyRq0fGE8ixwGGjAwYwNUaqte2NffVXgfZnDsOj"
    
    // sol = 100
    // earthDate = 2000-06-22
    // camera = "all"   
    // page = 1;
    startDate = "1972-06-22"
    endDate = "1972-06-24"
    api_key = key
    params = { "start_date": startDate,
                "end_date": endDate,
                "api_key": key
                        }
    // api call and log response

    function parseAsteroid(resp)
    {
        distance = resp['near_earth_objects']["1972-06-22"][0]["close_approach_data"][1];
        console.log(`temp in farinheight = ${distance}`)

    }

    // function getNasa(resp)
    // {
    //     id = resp[0]["id"]
    //     console.log(`id = ${id}`)
    //     return id; 
    // }

    $.ajax({
        url: url,
        type: "GET",
        data: params,
        success: function(resp){
            console.log(resp);
            console.log(resp);
                        const collection = resp["collection"]["items"];
                        console.log(typeof(collection))
                            collection.forEach((item, index)=>{
                                console.log(index, item["links"]["0"]["href"])
                            })
         
            //parseAsteroid(resp)
       

        },
        error: function(error){
            console.log(error)
        }
    });
    }


// DONKI example - specifically solar flare

function DONKI_example(){
    // Set up Paramaters

    url = "https://api.nasa.gov/DONKI/FLR"
    key = "qgHLccVFixbbKFa9LbcY9yvSbfh6t7vnHIa6XoDq"
        // The date format is YYYY-MM-DD
    startDate = "2022-09-01"
    endDate = "2022-9-31"
    api_key = key
    params = {"startDate": startDate,
                "endDate": endDate,
                "api_key": key
                        }
    // api call and log response

    
    function changeDisplay(resp){
       // let [temp, windSpeed] = parseWeather(resp);
       let [index, type] = parse(resp); 

        // windSpeed will be related to the height of a rectangle
        // temp will be the color of that rectangle
        // to do this we will make a grid element and set the size
        let newOBJ = document.createElement("div");
        
        // Call the scaeProperly function to map the range of inputs to the coresponding out put range. 0-255 for color and 0-100 for height. the height was arbitrarly chosen
        //properTemp = scaleProperly(temp, 0, 40, 0, 255); 
        p//roperWindspeed = scaleProperly(windSpeed,0,8,0,100)
        newOBJ.style.backgroundColor = `rgb(50,50,50)`;
        newOBJ.style.height = `${type}px`
        newOBJ.style.width = '100px'
      
        const drawingArea = document.getElementById('drawingArea');
        drawingArea.appendChild(newOBJ);

    }

    function parse(resp)
    {
            
        resp.forEach((item, index)=>{
            console.log(index, item["classType"])
        })
        return [item];
    }
    
    function addLat(number){
        previousLon = parseFloat(sessionStorage.getItem("lat"))
        newLat = previousLon + number;
        sessionStorage.setItem("lat", newLat);
        console.log(`new lat = ${sessionStorage.getItem("lat")}`)   
    }

    $.ajax({
        url: url,
        type: "GET",
        data: params,
        success: function(resp){
            console.log(resp);
            changeDisplay(resp);

        },
        error: function(error){
            console.log(error)
        }
    });
    }

// // EARTH example 

//might not work anymore
// function EARTH_example(){
//     // Set up Paramaters

//     url = "https://api.nasa.gov/planetary/earth/imagery"
//     key = "qgHLccVFixbbKFa9LbcY9yvSbfh6t7vnHIa6XoDq"
    
//     lat = "41.878"
//     lon = "-87.629"
//     dim = 0.025     // width and height of image in degrees
//     date = "2015-11-20" 	// YYYY-MM-DD
//     api_key = key
//     params = {"lat": lat,
//                 "lon": lon,
//                 "dim": dim,
//                 // "date": date,
//                 "api_key": key
//                         }
//     // api call and log response
//     console.log("ran")
//     $.ajax({
//         url: url,
//         type: "GET",
//         data: params,
//         success: function(resp){
//             console.log(resp);

//         },
//         error: function(error){
//             console.log(error)
//         }
//     });
//     }


// // NASA Image and Video Library

// function Nasa_Image_Video_example(){
//     // Set up Paramaters

//     url = "https://images-api.nasa.gov/search"
//     key = "6ZyRq0fGE8ixwGGjAwYwNUaqte2NffVXgfZnDsOj"
    
//     q = 'q';
//     // api_key = key
//     params = {"q": q
//                         }
//     // api call and log response
//     $.ajax({
//         url: url,
//         type: "GET",
//         data: params,
//         success: function(resp){
//             console.log(resp);
//             const collection = resp["collection"]["items"];
//             console.log(typeof(collection))
//                 collection.forEach((item, index)=>{
//                     console.log(index, item["links"]["0"]["href"])
//                 })

//         },
//         error: function(error){
//             console.log(error)
//         }
//     });
//     }

