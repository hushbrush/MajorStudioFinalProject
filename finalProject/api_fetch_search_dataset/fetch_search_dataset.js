// Smithsonian API example code
// check API documentation for search here: http://edan.si.edu/openaccess/apidocs/#api-search-search

// put your API key here;
const apiKey = "OBP6w8aw6IMti0Ip1efxd3z10OzeDyxqXVcRSCOK";

// search base URL
const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";

// constructing the initial search query
// const search = `unit_code:"NPG" AND online_visual_material:true AND topic:"Men"`;
const search = `data_source:"National+Postal+Museum" AND online_visual_material:true AND online_media_type:"Images" AND object_type:"Postage+stamps"`;

// array ole.log(data)that we will write into
let myArray = [];

// string that will hold the stringified JSON data
let jsonString = '';

// search: fetches an array of terms based on term category
function fetchSearchData(searchTerm) {
  let url = searchBaseURL + "?api_key=" + apiKey + "&q=" + searchTerm;
  // console.log(url);
  window
    .fetch(url)
    .then(res => res.json())
    .then(data => {

      // console.log(data);
      // constructing search queries to get all the rows of data
      // you can change the page size
      let pageSize = 1000;
      let numberOfQueries = Math.ceil(data.response.rowCount / pageSize);;
      // console.log("Number:")
      // console.log(numberOfQueries)
      for (let i = 0; i < numberOfQueries; i++) {
        // making sure that our last query calls for the exact number of rows
        if (i == (numberOfQueries - 1)) {
          searchAllURL = url + `&start=${i * pageSize}&rows=${data.response.rowCount - (i * pageSize)}`;
        } else {
          searchAllURL = url + `&start=${i * pageSize}&rows=${pageSize}`;
        }
        // console.log("searchAllURL")
        // console.log(searchAllURL)
        fetchAllData(searchAllURL);

      }
    })
    .catch(error => {
      console.log(error);
    })
}

// fetching all the data listed under our search and pushing them all into our custom array
function fetchAllData(url) {
  window
    .fetch(url)
    .then(res => res.json())
    .then(data => {
      //to check links uncomment this
      console.log(data)
      console.log("fetchAllData")
      console.log(myArray);
      data.response.rows.forEach(function (n) {
        addObject(n);
      });
      
      jsonString += JSON.stringify(myArray);
      
    })
    .catch(error => {
      console.log(error)
    })

}

// create your own array with just the data you need

var usable_topics=[], current_topic;
function addObject(objectData) {
  
  {
    myArray.push({
      id: objectData.id,
      title: objectData.title,
      date: objectData.content.indexedStructured.date,
      place: objectData.content.indexedStructured.place,
      topic: objectData.content.indexedStructured.topic,
      printer: objectData.content.freetext.name,
      description: objectData.content.freetext.notes,
      mediumDimensions: objectData.content.freetext.physicalDescription,
      collection: objectData.content.freetext.title,
      thumbnail: objectData.content.descriptiveNonRepeating.online_media.media, 
      link: "https://postalmuseum.si.edu/object/"+objectData.url.split(":")[1]
      
    })

  }
  
  console.log("here is the  data to be downloaded:")
  console.log(usable_topics)
  }  
  


fetchSearchData(search);

//---------------------------UNIT CODES------------------------------
// ACAH: Archives Center, National Museum of American History
// ACM: Anacostia Community Museum
// CFCHFOLKLIFE: Smithsonian Center for Folklife and Cultural Heritage
// CHNDM: Cooper-Hewitt, National Design Museum
// FBR: Smithsonian Field Book Project
// FSA: Freer Gallery of Art and Arthur M. Sackler Gallery Archives
// FSG: Freer Gallery of Art and Arthur M. Sackler Gallery
// HAC: Smithsonian Gardens
// HMSG: Hirshhorn Museum and Sculpture Garden
// HSFA: Human Studies Film Archives
// NAA: National Anthropological Archives
// NASM: National Air and Space Museum
// NMAAHC: National Museum of African American History and Culture
// NMAfA: Smithsonian National Museum of African Art
// NMAH: Smithsonian National Museum of American History
// NMAI: National Museum of the American Indian
// NMNHANTHRO: NMNH - Anthropology Dept.
// NMNHBIRDS: NMNH - Vertebrate Zoology - Birds Division
// NMNHBOTANY: NMNH - Botany Dept.
// NMNHEDUCATION: NMNH - Education & Outreach
// NMNHENTO: NMNH - Entomology Dept.
// NMNHFISHES: NMNH - Vertebrate Zoology - Fishes Division
// NMNHHERPS: NMNH - Vertebrate Zoology - Herpetology Division
// NMNHINV: NMNH - Invertebrate Zoology Dept.
// NMNHMAMMALS: NMNH - Vertebrate Zoology - Mammals Division
// NMNHMINSCI: NMNH - Mineral Sciences Dept.
// NMNHPALEO: NMNH - Paleobiology Dept.
// NPG: National Portrait Gallery
// NPM: National Postal Museum
// SAAM: Smithsonian American Art Museum
// SI: Smithsonian Institution, Digitization Program Office
// SIA: Smithsonian Institution Archives
// SIL: Smithsonian Libraries
