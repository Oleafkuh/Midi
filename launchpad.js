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
  
    if ( note == 98){
      document.getElementById('hello_tag').textContent = "GoodBye!"
      colorM(note,104);
      colorM(note+1,104);
      colorM(note+2,104);
  
    }
  
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
          document.getElementById('hello_tag').textContent = "Hello World!"
          colorM(note,0);
          colorM(note+1,0);
          colorM(note+2,0);
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