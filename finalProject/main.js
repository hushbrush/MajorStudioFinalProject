
import { colord } from 'colord';
import { extend } from 'colord';
import namesPlugin from 'colord/plugins/names';

// Enable CSS color names support
extend([namesPlugin]);

let primaryColour = "#f0ead6", secondaryColour = "#FFF", tertiaryColour = "#fff", bandColor= "#000", dimColour="#b3b3b3", highlightColour="#fff", tickTextColour= "#d1d1d1", blackColour= "#000";


let i, cleanedData, indexedData=[], bucketedData=[]; 
let  maxFinalIndex;
  // Calculate the maximum index for each factor
  const maxCondition = 50;
  const maxDate = 30;
  const maxRarity = 25;
  const maxPrintingTechniques = 10;
  const maxHistoricalEvent= 20;
  const maxFamousFigures = 10;
  const maxDenomination = 10;
  const maxCollection = 5;
  const maxPrinter = 5;


// // Assume `maxValues` is an object with normalization values for each index and dataset
// const maxValues = { collection: 5, condition: 50, rarity: 25, printingtechniques: 10, historicalsignificance: 20, famousfigures: 10, denomination: 20,  date: 30, collection: 5, printer: 5 };

async function loadData() {
    try {
        const data = await d3.json('data/data.json');
        cleanedData = analyseData(data);
        
    } catch (error) {
        console.error('Error loading the JSON data:', error);
    }
}

function analyseData(data) {
    if (!Array.isArray(data)) {
        console.error('Expected an array but received:', data);
        return [];
    }

    const cleanedData = [];

    data.forEach(function (element) {
        // Initialize the obj with default values
        let obj = {
            title: element.title ? element.title : "NA",
            date: element.date ? element.date : "NA",
            thumbnail: element.thumbnail?.[0]?.thumbnail || "NA",
            link: element.link || "NA",
            printer: "NA",
            depicts: "NA",
            description: "NA",
            medium: "NA",
            dimensions: "NA",
            place: element.place?.toString() || "NA",
            collection: "NA",
            topics: element.topic || "NA",
            color: primaryColour // Default color if parsing fails
        };

        // Extract information from `element.printer`
        if (element.printer) {
            for (let i = 0; i < element.printer.length; i++) {
                if (element.printer[i].label === "Depicts") {
                    obj.depicts = obj.depicts === "NA" 
                        ? element.printer[i].content 
                        : obj.depicts + "; " + element.printer[i].content;
                }
                if (element.printer[i].label === "Printer") {
                    obj.printer = obj.printer === "NA" 
                        ? element.printer[i].content 
                        : obj.printer + "; " + element.printer[i].content;
                }
            }
        }

        // Extract information from `element.description`
        if (element.description) {
            for (let i = 0; i < element.description.length; i++) {
                obj.description = obj.description === "NA" 
                    ? element.description[i].content 
                    : obj.description + "; " + element.description[i].content;
            }
        }

        // Extract information from `element.collection`
        if (element.collection) {
            for (let i = 0; i < element.collection.length; i++) {
                obj.collection = obj.collection === "NA" 
                    ? element.collection[i].content 
                    : obj.collection + "; " + element.collection[i].content;
            }
        }

        // Extract information from `element.mediumDimensions`
        if (element.mediumDimensions) {
            for (let i = 0; i < element.mediumDimensions.length; i++) {
                if (element.mediumDimensions[i].label === "Medium") {
                    obj.medium = obj.medium === "NA" 
                        ? element.mediumDimensions[i].content 
                        : obj.medium + "; " + element.mediumDimensions[i].content;
                }
                if (element.mediumDimensions[i].label === "Dimensions") {
                    obj.dimensions = obj.dimensions === "NA" 
                        ? element.mediumDimensions[i].content 
                        : obj.dimensions + "; " + element.mediumDimensions[i].content;
                }
                const colorMatch = element.mediumDimensions[0].content.match(/ink\s*\((.*?)\)/i);
                
                if (colorMatch && colorMatch[1]) {
                    obj.color = colorMatch[1].toLowerCase(); // Extract and normalize the color
                }

                

            }
        }

        // Extract original price from `obj.title`
        const regex = /(\$?\d+(\.\d+)?[c\$]?)/;
        if (regex.test(obj.title)) {
            const match = obj.title.match(regex)[0];
            if (match.includes('$')) {
                const dollars = parseFloat(match.replace(/[^\d.-]/g, ''));
                const cents = Math.round(dollars * 100);
                obj.orgPrice = cents + "c";
            } else {
                obj.orgPrice = match;
            }
        } else if (obj.title.includes('cent')) {
            const match = obj.title.match(/\d+/);
            obj.orgPrice = match ? match[0] + "c" : "NA";
        } else {
            obj.orgPrice = "NA";
        }     // Check for specific terms in `obj.title`
        if (obj.title.includes('plate')) {
            obj.ssp = "proof plate";
        } else if (obj.title.includes('single')) {
            obj.ssp = 1;
        } else if (obj.title.includes('sheet') || obj.title.includes('block') || obj.title.includes('strip')) {
            const match = obj.title.match(/\d+/);
            if (match) {
                const number = parseInt(match[0]);
                if (obj.title.includes('strip of')) {
                    obj.ssp = number;
                } else if (obj.title.includes('block of')) {
                    obj.ssp = number;
                } else if (obj.title.includes('sheet of')) {
                    obj.ssp = number;
                } else {
                    obj.ssp = "NA";
                }
            } else
             {
                obj.ssp = "NA";
            }
        }
        else
             {
                obj.ssp = "NA";
            }
        obj.selected = false; // Add a selected state for filtering

        // Add the processed object to the cleanedData array
        cleanedData.push(obj);
    });

    return cleanedData;
}


// Load the data
async function runCode() {
    await loadData();
    for (i = 0; i < cleanedData.length; i++) {
        indexedData[i] = createStampIndex(cleanedData[i]);
        bucketedData[i] = classifyStampByBucket(indexedData[i]);
        if(bucketedData[i].color)
            bucketedData[i].color = normalizeColor(bucketedData[i].color);

        
    }
    
    createRadarChart(bucketedData[2].allIndices, "#radarChartIntro")
    createRadarChart(bucketedData[2].allIndices, "#radarChart")
    createBucketChart(bucketedData);
    createParallelChart(bucketedData);
    showImages(bucketedData);

    
}

runCode();




function createStampIndex(stamp) {
    let index = 0;
    
    // Condition of the Stamp (Unused, Mint, etc.)(max 15)
    let conditionIndex = 0;

if (stamp.description) {
    const desc = stamp.description.toLowerCase();

    // Unused and mint conditions
    if (desc.includes("mint")) {
        conditionIndex = 50; // Perfect condition
    } else if (desc.includes("unused")) {
        conditionIndex = 25; // Excellent but less than mint
    }

    // Lightly used or slightly worn
    if (desc.includes("lightly used") || desc.includes("slightly worn")) {
        conditionIndex = 5; // Minimal wear
    }

    // Fancy cancels or other wear marks
    if (desc.includes("fancy cancel")) {
        conditionIndex = Math.max(conditionIndex, 10); // Recognizable wear with collectible value
    }

    // Handling stamps identified as "proofs" or "reprints"
    if (desc.includes("proof") || desc.includes("reprint")) {
        conditionIndex = Math.min(conditionIndex, 20); // Generally less desirable for postage, but may have collector value
    }

    // Other descriptors that might reflect physical state
    if (desc.includes("perf 12") || desc.includes("perforation")) {
        conditionIndex += 5; // Adjustment for clear perforations
    }
    if (desc.includes("card plate proof")) {
        conditionIndex += 5; // Proofs printed on special materials
    }

    // Final adjustments based on detected condition
    conditionIndex = Math.min(conditionIndex, 50); // Cap at 50
}

index += conditionIndex;
    // Rarity of the Stamp (max 25)
let rarityIndex = 0;
if (stamp.ssp === "proof plate" || stamp.title.includes("rare") || stamp.description.includes("plate proof")) {
    rarityIndex = 25;  // Highest rarity for proof plates and rare errors
} else if (stamp.title.includes("misprint") || stamp.description.includes("limited edition") || stamp.title.includes("unique")||stamp.title.includes("error")||(stamp.title.includes("first issue"))) {
    rarityIndex = 20;  // Rare misprints, limited editions, or unique characteristics
} else if (stamp.title.includes("commemorative") || stamp.description.includes("special release")) {
    rarityIndex = 15;  // Commemorative and special issue stamps
} else if (stamp.description.includes("first edition")|| stamp.description.includes("reprint")) {
    rarityIndex = 10;  // Limited issue or first editions with some rarity
} else if (stamp.description.includes("common") || stamp.title.includes("standard")) {
    rarityIndex = 5;  // Common or standard stamps with low rarity
}
index += rarityIndex;


    // rarity of the Stamp (max 10)
    let printingTechniquesIndex = 0;
    if (stamp.medium) {
        if (stamp.medium.includes("engraving") || stamp.medium.includes("plate printing")) {
            printingTechniquesIndex = 5;
        } else if (stamp.medium.includes("lithography") || stamp.medium.includes("intaglio")) {
            printingTechniquesIndex = 3;
        } else if (stamp.medium.includes("woodcut") || stamp.medium.includes("screen")) {
            printingTechniquesIndex = 2;
        } else if (stamp.medium.includes("offset") || stamp.medium.includes("digital")) {
            printingTechniquesIndex = 1;
        }
    }
    index += printingTechniquesIndex;
    

  
    // Historical Significance (e.g., Wars, Reformations, Revolutions, Economic Movements)
let historicalSignificanceIndex = 0;
if (stamp.topics) {
    for (let topic of stamp.topics) {
        if (topic.match(/(Civil War|World War|Revolution|Historic Event|Colonial|Empire|Independence|Liberation|Rebellion|Suffrage|Equality|Socialism|Communism|Holocaust|Genocide|Economic Crisis|Great Depression|Renaissance|Enlightenment|Art Movement|Labor Movement|Globalization|Exploration)/i)) {
            historicalSignificanceIndex = 20;
            break;
        } else if (topic.match(/(Spanish Inquisition|French Revolution|Industrial Revolution|Neolithic Revolution|Scientific Revolution|Abolitionism|Feminism|Civil Rights Movement|Environmentalism|Urbanization|Monarchy|Feudalism|Balkanization|Enclosure Movement|Imperialism|Great Migration|Black Plague|Treaty of Versailles|Vietnam War|Prohibition|Civil Rights Act|Suffragette|Social Reform|The New Deal|Post-War Reconstruction|Colonial Resistance|Age of Exploration|Transatlantic Slave Trade|Reformation|Age of Enlightenment|Manifest Destiny|Trail of Tears|American Revolution|Constitutional Convention|Women's Suffrage|Civil Rights Act|Labor Unions|Great Society|Space Race|The New Deal|Watergate|Freedom of Speech|Cold War Espionage)/i)) {
            historicalSignificanceIndex = 10;        
        } else if (topic.match(/(Pax Romana|Cold War|Terrorism|Financial Crisis|Gilded Age|Soviet Union|Fascism|Apartheid|Decolonization|Cuban Missile Crisis|Nuclear Arms Race|Arab Spring|Brexit|Climate Change|Information Revolution|Digital Age|Postmodernism)/i)) {
            historicalSignificanceIndex = 5;
        }
    }
}
index += historicalSignificanceIndex;

    

    let famousFiguresIndex = 0;

if (stamp.title || stamp.depicts) {
    // Categorized list of famous figures
    const famousFigures = [
        // Politics and Leadership
        { name: "Lincoln", score: 10 },
        { name: "Washington", score: 10 },
        { name: "Roosevelt", score: 9 },
        { name: "Mandela", score: 10 },
        { name: "Gandhi", score: 9 },
        { name: "Churchill", score: 8 },
        { name: "Obama", score: 7 },
        { name: "Kennedy", score: 8 },
        { name: "Queen", score: 7 },
        { name: "Queen Elizabeth II", score: 7 },
        { name: "Napoleon", score: 8 },
        { name: "the Great", score: 7 },
        { name: "Caesar", score: 8 },
    
    
        // Science and Innovation
        { name: "Einstein", score: 10 },
        { name: "Curie", score: 10 },
        { name: "Newton", score: 10 },
        { name: "Tesla", score: 9 },
        { name: "Edison", score: 8 },
        { name: "Galilei", score: 10 },
        { name: "Vinci", score: 10 },
        { name: "Darwin", score: 8 },
        { name: "Hawking", score: 8 },
        { name: "Turing", score: 9 },
        { name: "Goodall", score: 7 },
        { name: "Mendel", score: 7 },
        { name: "Sagan", score: 7 },
        { name: "Carson", score: 8 },
    
        // Arts and Literature
        { name: "Shakespeare", score: 10 },
        { name: "wain", score: 8 },
        { name: "Dickens", score: 8 },
        { name: "Homer", score: 9 },
        { name: "Dickinson", score: 7 },
        { name: "Angelou", score: 7 },
        { name: "Gogh", score: 9 },
        { name: "Picasso", score: 9 },
        { name: "Michelangelo", score: 10 },
        { name: "Monet", score: 8 },
        { name: "Beethoven", score: 9 },
        { name: "Mozart", score: 9 },
        { name: "Kahlo", score: 8 },
        { name: " Bach", score: 9 },
    
        // Civil Rights and Activism
        { name: "Tubman", score: 9 },
        { name: "Rosa Parks", score: 9 },
        { name: "Frederick Douglass", score: 9 },
        { name: "Martin Luther King Jr.", score: 10 },
        { name: "Susan B. Anthony", score: 8 },
        { name: "Malcolm X", score: 8 },
        { name: "Ida B. Wells", score: 8 },
        { name: "Sojourner Truth", score: 8 },
        { name: "Eleanor Roosevelt", score: 8 },
    
        // Exploration and Adventure
        { name: "Amelia Earhart", score: 8 },
        { name: "Neil Armstrong", score: 9 },
        { name: "Buzz Aldrin", score: 8 },
        { name: "Christopher Columbus", score: 8 },
        { name: "Marco Polo", score: 7 },
        { name: "Ferdinand Magellan", score: 8 },
        { name: "Robert Falcon Scott", score: 7 },
        { name: "Charles Lindbergh", score: 8 },
        { name: "Sally Ride", score: 8 },
    
        // Modern Influencers
        { name: "Jobs", score: 7 },
        { name: "Gates", score: 7 },
        { name: "Oprah Winfrey", score: 7 },
        { name: "Mark Zuckerberg", score: 3 },
        { name: "Elon Musk", score: 8 },
        { name: "Jeff Bezos", score: 6 },
        { name: "Malala Yousafzai", score: 8 },
        { name: "Greta Thunberg", score: 6 },
        { name: "Serena Williams", score: 5 },
        { name: "LeBron", score: 5 }
    ];
    

    // Normalize fields for case-insensitive comparison
    const title = stamp.title?.toLowerCase() || "";
    const depicts = stamp.depicts?.toLowerCase() || "";

    // Find the highest score among matches
    famousFigures.forEach(figure => {
        const figureName = figure.name.toLowerCase();
        if (title.includes(figureName) || depicts.includes(figureName)) {
            famousFiguresIndex = Math.max(famousFiguresIndex, figure.score);
        }
    });
}

// Add the computed index to the overall index, ensuring the maximum value does not exceed 10
index += Math.min(famousFiguresIndex, 10);

    

    // Denomination and Scarcity
    let denominationIndex = 0;
    const denomination = parseFloat(stamp.orgPrice.replace(/[^\d.-]/g, ''));
    if (denomination >= 50 || (denomination >= 1 && stamp.orgPrice.includes('$'))) {
        denominationIndex = 10;
    } else if (denomination >= 10) {
        denominationIndex = 5;
    } else {
        denominationIndex = Math.round((denomination / 10) * 2);
    }
    index += denominationIndex;



    // Date and Period of Issue
    let dateIndex = 0;
    const year = parseInt(stamp.date[0].substring(0, 4));
    if (year <= 1800) {
        dateIndex = 30;
    } else if (year < 1900) {
        dateIndex = 20;
    } else if (year < 1950) {
        dateIndex = 10;
    }
    index += dateIndex;

 

    // Collection and Catalog Info (e.g., Scott Catalogue, Imperforate, Error, etc.)
    let collectionIndex = 0;
   
    
    // Ensure we're checking if the collection is present
    if (stamp.collection) {
        // Check if it's part of the Scott Catalogue collection
        if (stamp.collection.includes("Scott Catalogue")) {
            collectionIndex += 0.5; // Base value for Scott Catalogue stamps
    
            // Regular issues and commemorative stamps
            if (stamp.collection.match(/USA \d+/)) { // USA Scott numbers
                collectionIndex += 3;  // Regular USA stamps 
            }
            if (stamp.collection.includes("USA PR")) { collectionIndex += 3.5; } // Plate proofs
            if (stamp.collection.includes("USA O")) { collectionIndex += 4; } // Official stamps
            if (stamp.collection.includes("USA J")) { collectionIndex += 3.5; } // Postage Due
            if (stamp.collection.match(/Scott Catalogue USA (\d{1,3}[A-Z0-9]*)/)) { collectionIndex += 3; } // Commemoratives
            
            // Famous series and errors
            if (stamp.collection.includes("Inverted Jenny")) { collectionIndex += 5; }
            if (stamp.collection.includes("imperforate")) { collectionIndex += 4; } // Imperforate
            if (stamp.collection.includes("error")) { collectionIndex += 5; } // Printing errors
            if (stamp.collection.includes("Airmail")) { collectionIndex += 4.5; }
            if (stamp.collection.includes("classic")) { collectionIndex += 3; }
            
            // Specific famous stamps and errors
            if (stamp.collection.includes("Scott Catalogue USA 11")) { collectionIndex += 5; }
            if (stamp.collection.includes("Scott Catalogue USA 143L3")) { collectionIndex += 4; }
            if (stamp.collection.includes("Scott Catalogue USA 44TC")) { collectionIndex += 4; }
            if (stamp.collection.includes("Scott Catalogue CSA 6")) { collectionIndex += 6; }
            if (stamp.collection.includes("Scott Catalogue CSA 7")) { collectionIndex += 6.5; }
            if (stamp.collection.includes("Scott Catalogue USA 246")) { collectionIndex += 4.5; }
            
            // Back-of-Book stamps
            if (stamp.collection.includes("Back-of-Book")) { collectionIndex += 3.5; }
            if (stamp.collection.includes("Revenue")) { collectionIndex += 4.5; }
            
            // Additional specialized categories
            if (stamp.collection.includes("Postal Tax")) { collectionIndex += 4; } // Tax stamps
            if (stamp.collection.includes("Postage Due")) { collectionIndex += 3.5; }
            if (stamp.collection.includes("Special Printing")) { collectionIndex += 4; }
            if (stamp.collection.includes("Reprint")) { collectionIndex += 3; }
        }
    }
    
    index += collectionIndex;
    

 
     
// Define sets for printers to simplify checks
const engravingPrinters = new Set([
    "National Bank Note Company",
    "American Bank Note Company",
    "Bureau of Engraving and Printing",
    "Wells Fargo & Co.",
    "Post Office Department",
    "Security Engraving and Printing",
    "Postal Press of New York",
    "U.S. Treasury"
]);

// Initialize printerIndex
let printerIndex = 0;

if (stamp.printer !== "NA") {
    // Match printers and adjust the index
    if (engravingPrinters.has(stamp.printer)) {
        switch (stamp.printer) {
            case "National Bank Note Company":
            case "American Bank Note Company":
                printerIndex += 1; // Increment for these printers
                break;
            case "Bureau of Engraving and Printing":
            case "Wells Fargo & Co.":
                printerIndex += 2; // Increment for these printers
                break;
            case "Security Engraving and Printing":
                printerIndex += 2.5; // Slightly higher for Security Engraving and Printing
                break;
            case "Postal Press of New York":
                printerIndex += 2; // Postal Press of New York
                break;
            case "U.S. Treasury":
                printerIndex += 3; // U.S. Treasury gets the highest index boost
                break;
            case "Post Office Department":
                printerIndex += 0.5; // Post Office Department gets a small boost
                break;
        
            case "National Bank Note Company":
                printerIndex += 2;
                break;
            case "American Bank Note Company":
                printerIndex += 1.5;
                break;
            case "Bureau of Engraving and Printing":
                printerIndex += 1.2;
                break;
            case "Wells Fargo & Co.":
                printerIndex += 1;
                break;
            case "Post Office Department":
                printerIndex += 0.8;
                break;
            case "Security Engraving and Printing":
                printerIndex += 0.6;
                break;
            case "Postal Press of New York":
                printerIndex += 0.4;
                break;
            case "U.S. Treasury":
                printerIndex += 0.2;
                break;
            default:
                break;
        }
    }

    // Additional checks for engraving medium or proof plates
    if (stamp.medium && stamp.medium.includes("engraving")) {
        printerIndex += 1; // Engraving medium boosts the index
    }
    
    if (stamp.ssp && stamp.ssp === "proof plate") {
        printerIndex += 1.5; // Proof plate adds a larger boost
    }

    // Description check for plate mark or watermark
    if (stamp.description && (stamp.description.includes("plate mark") || stamp.description.includes("watermark"))) {
        printerIndex += 1.2; // Add value for plate marks or watermarks
    }
}

// Add printerIndex to the overall index
index += printerIndex;


    // Add the calculated index to the stamp object
    stamp.index = index;
  
      maxFinalIndex = maxCondition + maxRarity + maxPrintingTechniques  + maxHistoricalEvent + maxFamousFigures + maxDenomination  + maxDate + maxCollection + maxPrinter;
    

    // Create an object with all the current values
    const allIndices = {
        'Condition': conditionIndex,
        'Rarity': rarityIndex,
        'PrintingTechniques': printingTechniquesIndex,
        'HistoricalEvent': historicalSignificanceIndex,
        'FamousFigures': famousFiguresIndex,
        'Denomination': denominationIndex,
        'Date': dateIndex,
        'Collection': collectionIndex,
        'Printer': printerIndex,
        'FinalIndex': index
    };

    // Add the current values object to the stamp
    stamp.allIndices = allIndices;

    // Return the updated stamp object with the index and current values
    return stamp;
}

function classifyStampByBucket(data) {
    
     if (data.index >= 70) {
        data.bucket = "Very High Value";
        } else if (data.index >= 50) {
        data.bucket = "High Value";
        } else if (data.index >= 20) {
        data.bucket = "Moderate Value";
        } else {
        data.bucket = "Low Value";
        }
    return(data)
}


// Function to aggregate indices by dataset
function aggregateAndNormalize(selectedStamps) {
    const aggregatedData = {}; // Object to store aggregated indices for each dataset

    //if multiple stamps are selected, I want the aggregate of each index for all the stamps.
    //no matter how many are selected, the final output is one object with each index aggregated.
    for(i = 0; i < selectedStamps.length; i++){
        const stamp= selectedStamps[i];
        
        Object.entries(stamp.allIndices).forEach(([index, value]) => {
            // The code here needs to add every dimension for the respective stamps, and then divide by the number of stamps selected.
            aggregatedData[index] = (aggregatedData[index] || 0) + value;
        });
    };
    //problem is here, aggregateddara is nor changed at aall
    for(i = 0; i < selectedStamps.length; i++){
    }
    Object.entries(aggregatedData).forEach(eachIndex => {
        
        aggregatedData[eachIndex[0]] = eachIndex[1]/(selectedStamps.length);
        
      
    });

    return aggregatedData; // Return normalized aggregated data
}

// Handle line clicks
function handleLineClick(data) {
    if (!data) {
        console.error("Data is undefined. Ensure that the click event is passing the correct data.");
        return;
    }
    
    data.selected = !data.selected;
    const selectedStamps = cleanedData.filter(stamp => stamp.selected==true);
    
    if (selectedStamps.length > 0) {
        console.log("Selected Stamps:", selectedStamps);
        // Set the stroke opacity based on the selected state
        d3.selectAll(".line")
            .each((d, i) => {
                console.log(`Line ${i}:`, d); // Check if `d` is defined
            });

        d3.selectAll("line")
            .data(cleanedData) // Ensure correct data binding
            .style("stroke-opacity", d => {
                console.log("after line opacity: " + d.selected);
                return d.selected ? 1 : 0.1;
            });

    
            
        // Aggregate and normalize data by dataset
        const aggregatedIndices = aggregateAndNormalize(selectedStamps);
        // Pass aggregated indices to the radar chart creation function
        const selectedTitles = selectedStamps.map(stamp => stamp.title);
        
        createRadarChart(aggregatedIndices, "#radarChart", selectedTitles);
    } else {
        console.log("No stamps selected.");
        d3.selectAll("line")
            .style("stroke-opacity", 1);
        createRadarChart([], "#radarChart"); // Pass empty data if nothing is selected
    }
}


function createRadarChart(data, location, titles) {
    
    
    d3.select(location).html("");

    var margin = {top: 100, right: 100, bottom: 100, left: 100},
     width = 400;
    let height = 400;
    let radarColour, skeletonColour;
    if(location == "#radarChartIntro"){
        radarColour = "#fff";
       // skeletonColour = "#fff";
        
    }
    else
    {
        radarColour = "#000";
      console.log(titles);
        
    }


    const svg = d3.select(location)
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

    
    // Create the radar chart
    const radarData = Object.entries(data).map(([key, value]) => {
        if (key === "FinalIndex") {
            return null; // Skip the last entry
        }
        const maxKey = `max${key}`;
        const max = eval(maxKey);
        
        return { axis: key, value: value / (max || 1), maxValue: max };
    }).filter(entry => entry !== null);
    

    // Sort the radar data in descending order of max
    radarData.sort((c) => c.value);


    // Create the radar chart
    const radius = Math.min(width, height) / 2;
    const angleSlice = Math.PI * 2 / radarData.length;

    // Create the scales
    const rScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, radius]);

    // Create the radial line generator
    const line = d3.lineRadial()
        .radius(d => rScale(d.value))
        .angle((d, i) => i * angleSlice);

    // Create the radar chart container
    const radarChart = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create the radar chart polygons
        radarChart.selectAll(".radarPolygon")
            .data([radarData])
            .enter()
            .append("path")
            .attr("class", "radarPolygon")
            .attr("d", d => line(d) + "Z") // Close the shape by connecting to the first point
            .style("fill", radarColour)
            .style("fill-opacity", 0.1)
            .style("stroke", radarColour)
            .style("stroke-opacity", 1)
            .style("stroke-width", "4px");

    // Create the radar chart axes
    const axis = radarChart.selectAll(".radarAxis")
        .data(radarData)
        .enter()
        .append("g")
        .attr("class", "radarAxis");

    axis.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (d, i) => rScale(1) * Math.cos(i * angleSlice - Math.PI / 2))
        .attr("y2", (d, i) => rScale(1) * Math.sin(i * angleSlice - Math.PI / 2))
        .attr("class", "radarLine")
        .style("stroke", radarColour)
        .style("stroke-width", "0.2px")
        .style("stroke-opacity", "0.8");

    axis.append("circle") // Add circle to mark the data point on the axis
        .attr("cx", (d, i) => rScale(d.value) * Math.cos(i * angleSlice - Math.PI / 2))
        .attr("cy", (d, i) => rScale(d.value) * Math.sin(i * angleSlice - Math.PI / 2))
        .attr("r", 4)
        .style("fill", radarColour)
        .style("stroke", radarColour)


    axis.append("text")
        .attr("class", "radarLabel")
        .attr("x", (d, i) => rScale(1.15) * Math.cos(i * angleSlice - Math.PI / 2))
        .attr("y", (d, i) => rScale(1.15) * Math.sin(i * angleSlice - Math.PI / 2))
        .text(d => {
            const label = d.axis;
            return label.replace(/([A-Z])/g, ' $1');
        })
        .style("text-anchor", "middle")
        .style("fill", radarColour)
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .style("font-family", "meursault-variable, serif")
        .style("font-size", "18px")
        .style("font-weight", "400");

}

function createBucketChart(data) {
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 1000 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    const svg = d3.select("#barChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var x = d3.scaleBand()
        .domain(["Low Value", "Moderate Value", "High Value", "Very High Value"])
        .range([0, width])
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("font-family", "meursault-variable, serif")
        .style("font-size", "18px")
        .style("font-weight", "600");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 250])
        .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

  

    // Add lines
    
svg.selectAll("line")
.data(data)
.enter()
.append("g") // Group for both hitbox and visible line
.each(function (d) {
    d3.select(this)
    .append("line")
    .attr("x1", x(d.bucket))
    .attr("y1", y(d.orgPrice))
    .attr("x2", d => (x(d.bucket) || 0) + x.bandwidth())
    .attr("y2", y(d.orgPrice))
    .style("stroke", "transparent") // Make it invisible
    .style("stroke-width", 10) // Larger clickable area
    .attr("z-index", 5)
    .on("mouseover", function (event, d) {
        if (d.thumbnail) {
            const imageSize = 230; // Size of the image
    
            // Find all relevant sibling lines (or lines in the same group) and append images
            const siblings = d3.select(this.parentNode).selectAll("line");
    
            siblings.each(function (siblingData, index) {
                
                // Ensure siblingData is valid and matches the expected conditions
                if (siblingData && siblingData.thumbnail) {
                    d3.select(this.parentNode) // Append to the parent group
                        .append("image")
                        .attr("class", "center-image") // Add a class for easy removal
                        .attr("x", () => x(siblingData.bucket) -30)
                        .attr("y", () => y(siblingData.orgPrice) - imageSize / 2 + index * imageSize) // Offset for multiple images
                        .attr("width", imageSize)
                        .attr("height", imageSize)
                        .attr("href", siblingData.thumbnail) // Use the sibling's thumbnail
                        .style("opacity", 0) // Start with 0 opacity
                        .style("pointer-events", "none") // Prevent interaction
                        .transition() // Animate appearance
                        .duration(500)
                        .ease(d3.easeCubicOut)
                        .attr("y", () => y(siblingData.orgPrice) + 10 + index * imageSize) // Slide below line
                        .style("opacity", 1)
                        .on("end", function () {
                            d3.select(this).interrupt(); // Stop further animations
                        });
                }
            });
        }
    })
    .on("mouseout", function () {
        // Remove all appended images on mouse out
        d3.selectAll(".center-image").remove();
    })
    .on("click", function (event, d) {
       
        handleLineClick(d);
    });
    
    

    // Append visible line
    d3.select(this)
        .append("line")
        .attr("x1", x(d.bucket))
        .attr("y1", y(d.orgPrice))
        .attr("x2", x(d.bucket) + x.bandwidth())
        .attr("y2", y(d.orgPrice))
        .style("stroke", d.color ? normalizeColor(d.color) : "#000") // Use normalized color
        .attr("stroke-width", 1); // Original thin line
}
);}


function createParallelChart(data) {
    var margin = { top: 50, right: 200, bottom: 40, left: 200 };
    var width = 1400 - margin.left - margin.right;
    var height = 3500 - margin.top - margin.bottom;

    const svg = d3.select("#ParallelChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const dimensions = Object.keys(data[0].allIndices);

    // Create scales for each dimension
    const xScales = {};
    dimensions.forEach(dim => {
        xScales[dim] = d3.scaleLinear()
            .domain(d3.extent(data, d => d.allIndices[dim] || 0)) // Ensure valid domains
            .range([0, width]);
    });

    const yScale = d3.scalePoint()
        .domain(dimensions)
        .range([0, height]);

    // Global state to track selected ranges
    const selectedRanges = {
        priceRange: [0, 100],
        rarenessRange: [0, 100],
        vibrancyRange: [0, 100],
        conditionRange: [0, 100],
        typeRange: [0, 100]
    };

    // Function to filter and update lines based on sliders
    function updateLines() {
        const filteredData = data.filter(d => {
            return dimensions.every(dim => {
                const range = selectedRanges[dim];
                const value = d.allIndices[dim];
                return !range || (value >= range[0] && value <= range[1]);
            });
        });
        showImages(filteredData);
        svg.selectAll(".line")
        .data(filteredData, d => d.id) // Use a unique identifier if available
        .join(
            enter => enter.append("path")
                .attr("class", "line")
                .attr("d", d => {
                    // Calculate the path for each dimension
                    const path = dimensions.map((dim, i) => {
                        const value = d.allIndices[dim];
                        const jitter = (Math.random() - 0.5) * 50; // Small random displacement
                        return value !== undefined && !isNaN(value)
                            ? [xScales[dim](value) + jitter, yScale(dim)]
                            : null;
                    }).filter(p => p !== null); // Remove null points
                    return d3.line().curve(d3.curveLinear)(path); // Use curveLinear to make stroke ends rounded
                })
                .style("fill", "none")
                .style("stroke", d => d.color)
                .style("opacity", 1)
                .style("stroke-width", 1),
            update => update, // Update unchanged
            exit => exit.remove() // Remove lines no longer matching filter
        );
        svg.selectAll(".axis").each(function () {
            this.parentNode.appendChild(this); // Move axis groups to the end of the DOM
        });
    }


updateLines(selectedRanges);
updateTextBlock(selectedRanges);
// Add invisible anchor for each dimension's slider
dimensions.forEach(dim => {
    const axisGroup = svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${yScale(dim)})`);

    // Create invisible anchor div for scrolling to this dimension's slider
    const anchorDiv = d3.select("#ParallelChart").append("div")
        .attr("id", `${dim}Anchor`)
        .style("position", "absolute")
        .style("top", `${yScale(dim)+3500}px`) // Position anchor at slider's y position
        .style("left", "0")
        .style("width", "1px")
        .style("height", "1px")
        .style("visibility", "hidden"); // Make it invisible

    // Create axis and sliders (rest of the code remains unchanged)
    axisGroup.call(d3.axisBottom(xScales[dim]))
        .selectAll("text")
        .style("fill", tickTextColour)
        .style("font-family", "meursault-variable, serif")
        .style("font-size", "18px");

    // Add axis label
    axisGroup.append("text")
        .attr("class", "axis-label")
        .attr("x", width + 80)
        .attr("y", -20)
        .style("text-anchor", "left")
        .style("text-align", "left")
        .style("fill", tickTextColour)
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .style("font-family", "meursault-variable, serif")
        .text(dim.replace(/([A-Z][a-z]*)/g, '\n$1').trim())
        .attr('z-index', 10);

    // Add slider group
    const sliderGroup = axisGroup.append("g")
        .attr("class", "slider")
        .attr("transform", `translate(0, 0)`);

    
        // Draw the slider line (initially fully selected)
        const sliderLine = sliderGroup.append("line")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("stroke", primaryColour)
            .attr("stroke-width", 2);

        // Draw the unselected parts of the slider line
        const leftSegment = sliderGroup.append("line")
            .attr("x1", 0)
            .attr("x2", 0) // Initially 0, updated dynamically
            .attr("stroke", primaryColour)
            .attr("stroke-opacity", 0.3)
            .attr("stroke-width", 2);

        const rightSegment = sliderGroup.append("line")
            .attr("x1", width) // Initially matches the right edge
            .attr("x2", width)
            .attr("stroke", primaryColour)
            .attr("stroke-opacity", 0.3)
            .attr("stroke-width", 2);

        // Add draggable handles
        const handleLeft = sliderGroup.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 10)
            .attr("fill", secondaryColour)
            .attr("cursor", "ew-resize")
            .call(d3.drag()
                .on("drag", function (event) {
                    const newX = Math.max(0, Math.min(width, event.x)); // Clamp within range
                    d3.select(this).attr("cx", newX);
                    selectedRanges[dim][0] = xScales[dim].invert(newX); // Update range
                    resetButton.attr("visibility", "visible");
                    updateSliderSegments();
                    updateLines(); // Update visualization
                    updateTextBlock(selectedRanges); // Update the text block
                }));

        const handleRight = sliderGroup.append("circle")
            .attr("cx", width)
            .attr("cy", 0)
            .attr("r", 10)
            .attr("fill", secondaryColour)
            .attr("cursor", "ew-resize")
            .call(d3.drag()
                .on("drag", function (event) {
                    const newX = Math.max(0, Math.min(width, event.x)); // Clamp within range
                    d3.select(this).attr("cx", newX);
                    selectedRanges[dim][1] = xScales[dim].invert(newX); // Update range
                    resetButton.attr("visibility", "visible");
                    updateSliderSegments();
                    updateLines(); // Update visualization
                    updateTextBlock(selectedRanges); // Update the text block
                }));

        // Initialize selected ranges
        selectedRanges[dim] = [xScales[dim].domain()[0], xScales[dim].domain()[1]];

        // Function to update slider segments
        function updateSliderSegments() {
            
            const leftX = xScales[dim](selectedRanges[dim][0]);
            const rightX = xScales[dim](selectedRanges[dim][1]);

            // Update positions of unselected segments
            leftSegment.attr("x2", leftX);
            rightSegment.attr("x1", rightX).attr("x2", width);

            // Update selected range segment
            sliderLine.attr("x1", leftX).attr("x2", rightX);
        }

        
        let resetButton = axisGroup.append("image")
        .attr("visibility", "hidden")
        .attr("x", width+30)
        .attr("y", -10) // Adjust y-position to align the image correctly
        .attr("width", 30) // Set the width of the image
        .attr("height", 30) // Set the height of the image
        .attr("xlink:href", "./assets/reset.svg")
        .style("cursor", "pointer")
        .on("click", function () {
            console.log("Resetting range for", dim);
            // Reset selected range
            selectedRanges[dim] = [xScales[dim].domain()[0], xScales[dim].domain()[1]];
            resetButton.attr("visibility", "hidden");
            // Reset slider handles
            handleLeft.attr("cx", xScales[dim](selectedRanges[dim][0]));
            handleRight.attr("cx", xScales[dim](selectedRanges[dim][1]));
    
            
    
            // Update visualization and text block
            updateLines();
            // Reset slider segments
            updateSliderSegments();
            updateTextBlock(selectedRanges);
            
        });

    
});


   
}

// Function to update the text block with clickable links
function updateTextBlock(selectedRanges) {
    const textBlock = document.getElementById("textBlock");
    let textContent = `
        <h3> These are all the stamps that fall in the following criteria: <br>
    `;

    // Add each range dynamically to the textContent, with clickable links
    Object.keys(selectedRanges).forEach(rangeKey => {
        const range = selectedRanges[rangeKey];
        const rangeName = capitalizeFirstLetter(rangeKey.replace('Range', ''));

        // Add space before capital letters in rangeName
        const formattedRangeName = rangeName.replace(/([A-Z])/g, ' $1');

        // Create clickable link for each range
        textContent += `
            <a href="#${rangeKey.replace('Range', '')}Anchor" 
               style="text-decoration: none; color: inherit;" 
               onclick="scrollToAnchor('${rangeKey.replace('Range', '')}Anchor')">
               ${formattedRangeName}: ${Math.floor(range[0])} and ${Math.floor(range[1])}
            </a> <br>`;
    });

    textContent += `</h3>`;

    // Set the inner HTML of the text block
    textBlock.innerHTML = textContent;
}

function showImages(data) {
    const imageContainer = document.getElementById("imageContainer");

    // Clear previous images
    imageContainer.innerHTML = "";

    data.forEach(({ thumbnail, title }, index) => {
        if (!thumbnail) return;

        // Create and configure an image element
        const image = document.createElement("img");
        image.src = thumbnail;
        image.alt = title || `Image ${index + 1}`;
        image.classList.add("thumbnail");

        // Add click event to open fullscreen
        image.addEventListener("click", () => {
            const overlay = document.getElementById("fullscreenOverlay");
            const fullscreenImage = document.getElementById("fullscreenImage");
            fullscreenImage.src = thumbnail;
            fullscreenImage.alt = title || `Image ${index + 1}`;
            overlay.classList.remove("hidden");
        });

        // Append to the container
        imageContainer.appendChild(image);
    });
}

// Enable horizontal scrolling with the arrow
document.getElementById("scrollArrow").addEventListener("click", () => {
    const imageContainer = document.getElementById("imageContainer");
    imageContainer.scrollBy({ left: 900, behavior: "smooth" }); // Scroll right by 300px
});

// Close fullscreen overlay
document.getElementById("closeFullscreen").addEventListener("click", () => {
    document.getElementById("fullscreenOverlay").classList.add("hidden");
});




function normalizeColor(inputColor) {

    if (inputColor.includes('multi;')) {
        return null; // Return null if the input contains 'multi;'
    }

    const parsedColor = colord(inputColor);

    if (parsedColor.isValid()) {
        const { r, g, b } = parsedColor.toRgb();

        // Check if r, g, and b are all zero (black color)
        if (r === 0 && g === 0 && b === 0) {
            return null; // Return null if RGB is zero
        }

        // Define a threshold for how "close to black" the color can be
        const threshold = 30; // RGB values below this will be considered close to black

        // If the color is very close to black, lighten it a little
        if (r < threshold && g < threshold && b < threshold) {
            return parsedColor.lighten(0.2).toHex(); // Lighten by 20% (adjust as needed)
        }

        return parsedColor.toHex(); // Convert to HEX for consistency
    } else {
        console.log("Invalid color input");
        return null; // Return null for invalid color input
    }
}

// Utility function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// Add smooth scrolling behavior
function scrollToAnchor(anchorId) {
    const target = document.getElementById(anchorId);
    if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}
