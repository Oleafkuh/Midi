
    function initializeLonLat(){
        startLongitude = -87.6298;
        startLattitude = 41.8781;
        sessionStorage.setItem("lon", startLongitude); 
        sessionStorage.setItem("lat", startLattitude); 
       
    }

    function addLongitude(number){
        previousLon = parseFloat(sessionStorage.getItem("lon"))
        newLon = previousLon + number;
        sessionStorage.setItem("lon", newLon);
        console.log(`new lon = ${sessionStorage.getItem("lon")}`)   
    }

    function subLongitude(number){
        previousLon = parseFloat(sessionStorage.getItem("lon"))
        newLon = previousLon - number;
        sessionStorage.setItem("lon", newLon);
        console.log(`new lon = ${sessionStorage.getItem("lon")}`)   
    }

    function addLat(number){
        previousLon = parseFloat(sessionStorage.getItem("lat"))
        newLat = previousLon + number;
        sessionStorage.setItem("lat", newLat);
        console.log(`new lat = ${sessionStorage.getItem("lat")}`)   
    }

    function subLat(number){
        previousLon = parseFloat(sessionStorage.getItem("lat"))
        newLat = previousLon - number;
        sessionStorage.setItem("lat", newLat);
        console.log(`new lat = ${sessionStorage.getItem("lat")}`)   
    }

    // function totalCarbon(resp){
    //     previousCarb = parseFloat(sessionStorage.getItem("carb"))
    //     newCarb = previousCarb + parsePollution(resp);
    //     sessionStorage.setItem("lat", newLat);
    //     console.log(`new lat = ${sessionStorage.getItem("lat")}`)   
    // }

    
    function totalCarbon(resp){
     let carbon = parsePollution(resp);
    }




    function parsePollution(resp){
        carbon = resp["list"][0]["components"]["co"];
        oxygen =  resp["list"][0]["components"]["o3"];
        //windSpeed = resp["wind"]["speed"]
        console.log(`co in air = ${carbon}\n oxygen in air = ${oxygen}`);
       // sessionSotage.setItem("carb", carbon); 
        return [carbon, oxygen];
    }

    function scaleProperly(number, inMin, inMax, outMin, outMax) {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    function changeDisplay(resp){
        let [carbon, oxygen] = parsePollution(resp);

        // windSpeed will be related to the height of a rectangle
        // temp will be the color of that rectangle
        // to do this we will make a grid element and set the size
        let newOBJ = document.createElement("div");
        //let newOBJ = document.getElementById('circle');
        
        // Call the scaeProperly function to map the range of inputs to the coresponding out put range. 0-255 for color and 0-100 for height. the height was arbitrarly chosen
        //properTemp = scaleProperly(temp, 0, 120, 0, 255); 
        //properWindspeed = scaleProperly(windSpeed,0,8,0,100)

        // const canvas = document.createElement("div");
        // const context = canvas.getContext('2d');
        // const centerX = canvas.width / 2;
        // const centerY = canvas.height / 2;
        // const radius = 70;
        // context.beginPath();
        // context.arc(centerX, centerY, ${carbon}, 0, 2 * Math.PI, false);
        // context.fillStyle = 'green';
        // context.fill();
        // context.lineWidth = 5;
        // context.strokeStyle = '#003300';
        // context.stroke();
                

        newOBJ.style.backgroundColor = `rgb(0,0, 0)`;
        newOBJ.style.arc = (10, 10, carbon, 0, 2 * Math.PI, false);
        newOBJ.style.height = `${carbon}px`
        newOBJ.style.width = `${oxygen*5}px`
        //newOBJ.border-radius = 50%
      
        const drawingArea = document.getElementById('drawingArea');
        drawingArea.appendChild(newOBJ);

    }


    function makeApiCall(){
        url = "http://api.openweathermap.org/data/2.5/air_pollution?"
        weatherKey = "0de270e39461d9732e596c433ebd7357"
        lat = sessionStorage.getItem("lat") 
        lon = sessionStorage.getItem("lon") 
        weatherParams = {"lat": lat,
                            "lon": lon,
                            "units": "imperial",
                            "appid": weatherKey
                            }
        //console.log(weatherParams)


        $.ajax({
            url: url,
            type: "GET",
            data: weatherParams,
            success: function(resp){
                console.log(resp);
                parsePollution(resp);
                changeDisplay(resp);
            },
            error: function(error){
                console.log(error)
            }
        });
    }
    console.log(navigator)
    let device; 
    
    if(navigator.requestMIDIAccess)
    {
        navigator.requestMIDIAccess().then(success, failure); 
    }
    
    
    function failure()
    {
        console.log("could not connect to MIDI");
    }
    
    function updateDevices(event)
    {
        console.log(event);
    }
    
    function success(midiAccess)
    {
        console.log("hello we got here")
        console.log(midiAccess)
        midiAccess.addEventListener('statechange', updateDevices);
        let inputs = midiAccess.inputs;
        console.log(inputs);
    
         inputs.forEach((input) => 
         {
             input.addEventListener('midimessage', handleInput);
         });
    }
    
    function handleInput(input)
     {
        console.log(input);
       
         let command = input.data[0];
         let note = input.data[1];
         let velocity = input.data[2];
    
         console.log(`command: ${command}, note: ${note}, velocity: ${velocity}`); 
    
        //  function noteOn(note)
        //  {
        //     console.log(`note: ${note}`);
        //  }
    
        //  if(velocity == 0)
        //  {
        //     noteOff(note);
        //  }
    
        /*let data = input.data;
        console.log(data); */
     }
    
     function noteOn(note) {
      console.log('on note');
        console.log(`note:${note} // on`);
      
        // if ( note == 98){
        //  function addLat(number)
      
        // }
      
        if ( note == 64){
          document.getElementById('hello_tag').textContent = "64!"
          colorM(note,124);
          colorM(note+1,124);
          colorM(note+2,124);
      
        }
      }
      
      function noteOff(note){
          console.log(`note:${note} // off`);
          
      
          if ( note == 99){
            
            }
      
          if ( note == 64){
              document.getElementById('hello_tag').textContent = "Hello World!"
              colorM(note,0);
              colorM(note+1,0);
              colorM(note+2,0);
            }
      
      }
      
      // This function is used to change the color of the midi's LED's. 
      // It is implemented in the noteOn and noteOff functions above
      function colorM(key,clr){
        // The color key can be found on page 11 @ https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwiEjtrOurb7AhXMlokEHcjqB_0QFnoECA8QAQ&url=https%3A%2F%2Fwww.djshop.gr%2FAttachment%2FDownloadFile%3FdownloadId%3D10737&usg=AOvVaw02Njpg1AY5jOV7Z6gjcw5W
          device && device.send([0x90,key,clr]); 
      }