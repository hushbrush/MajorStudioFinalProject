
import { colord } from 'colord';
import { extend } from 'colord';
import namesPlugin from 'colord/plugins/names';

// Enable CSS color names support
extend([namesPlugin]);

let primaryColour = "#f0ead6", secondaryColour = "#FFF", tertiaryColour = "#fff", bandColor= "#000", dimColour="#b3b3b3", highlightColour="#fff", tickTextColour= "#d1d1d1", blackColour= "#000";


let i, cleanedData, indexedData=[], bucketedData=[]; 
let  maxIndex;
  // Calculate the maximum index for each factor
  const maxcondition = 35;
  const maxrarity = 35;
  const maxprintingtechniques = 20;
  const maxedition = 10;
  const maxhistoricalsignificance= 30;
  const maxfamousfigures = 10;
  const maxdenomination = 20;
  const maxperforation = 12;
  const maxdate = 30;
  const maxcollection = 5;
  const maxprinter = 5;
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
    console.log(stamp);
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

   

    // Perforation Types (e.g., perf 12, Grill)
    let perforationIndex = 0;
    if (stamp.description && (stamp.description.includes("perf 12") || stamp.description.includes("grill"))) {
        perforationIndex = 12;
        
    }
    index += perforationIndex;

   // rarity of the Stamp (max 25)
    let rarityIndex = 0;
    if (stamp.ssp === "proof plate" || stamp.title.includes("error") || stamp.title.includes("rare") || stamp.description.includes("plate proof")) {
        rarityIndex = 35;
    }
    index += rarityIndex;

    // rarity of the Stamp (max 10)
    let printingTechniquesIndex = 0;
    if (stamp.medium && (stamp.medium.includes("engraving") || stamp.medium.includes("plate printing"))) {
        printingTechniquesIndex = 20;
    }
    index += printingTechniquesIndex;

   // rarity of the Stamp (max 15)
    let editionIndex = 0;
    if (stamp.title && (stamp.title.includes("first issue") || stamp.title.includes("limited edition") || stamp.description.includes("reprint"))) {
        editionIndex = 10;
    }
    index += editionIndex;

    // Historical Significance (e.g., Civil War, World War) max: 5
    let historicalSignificanceIndex = 0;
    if (stamp.topics) {
        for (let topic of stamp.topics) {
            if (topic.match(/(Civil War|World War|Expedition|Revolution|Historic Event|Colonial|Empire|Independence|Liberation|Rebellion|Suffrage|Equality|Socialism|Communism|Uprising|Holocaust|Genocide|Economic Crisis|Depression|Renaissance|Enlightenment|Art Movement|Labor Movement|Globalization|Exploration)/i)) {
                historicalSignificanceIndex = 30;
                break;
            }
        }
    }
    index += historicalSignificanceIndex;
    

    let famousFiguresIndex = 0;
    if (stamp.title || stamp.depicts) {
          // Expanded list of famous figures across various domains
          const famousFigures = [
                "Washington", "Franklin", "Lincoln", "Roosevelt", "Byrd", "Jefferson", "Adams", "Hamilton", 
                "Jackson", "Kennedy", "Eisenhower", "Truman", "Carver", "Douglas", "King", "Obama", "Teddy Roosevelt", 
                "Ford", "Madison", "Grant", "Patton", "Montgomery", "Churchill", "Stalin", "Lenin", "Einstein", 
                "Newton", "Darwin", "Curie", "Galileo", "Tesla", "Pasteur", "Fermi", "Hemingway", "Twain", "Dickens", 
                "Shakespeare", "Mozart", "Beethoven", "Van Gogh", "Picasso", "Michelangelo", "Socrates", "Aristotle", 
                "Plato", "Confucius", "Gandhi", "Mandela", "Boudicca", "Catherine the Great", "Cleopatra", "Marie Curie",
                "Harriet Tubman", "Rosa Parks", "Malcolm X", "Frederick Douglass", "Susan B. Anthony", "Wright Brothers", 
                "Amelia Earhart", "Neil Armstrong", "Buzz Aldrin", "Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Oprah"
          ];
     
          // Check if the title or depicts includes any of the famous figures
          if (famousFigures.some(figure => stamp.title?.includes(figure) || stamp.depicts?.includes(figure))) {
                famousFiguresIndex = 10;
          }
     }
     index += famousFiguresIndex;
    

    // Denomination and Scarcity
    let denominationIndex = 0;
    const denomination = parseFloat(stamp.orgPrice.replace(/[^\d.-]/g, ''));
    if (denomination >= 50 || (denomination >= 1 && stamp.orgPrice.includes('$'))) {
        denominationIndex = 20;
    } else if (denomination >= 10) {
        denominationIndex = 10;
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
  
     maxIndex = maxcondition + maxrarity + maxprintingtechniques + maxedition + maxhistoricalsignificance + maxfamousfigures + maxdenomination + maxperforation + maxdate + maxcollection + maxprinter;
    

    // Create an object with all the current values
    const allIndices = {
        'condition': conditionIndex,
        'rarity': rarityIndex,
        'printingtechniques': printingTechniquesIndex,
        'edition': editionIndex,
        'historicalsignificance': historicalSignificanceIndex,
        'famousfigures': famousFiguresIndex,
        'denomination': denominationIndex,
        'perforation': perforationIndex,
        'date': dateIndex,
        'collection': collectionIndex,
        'printer': printerIndex
    };

    // Add the current values object to the stamp
    stamp.allIndices = allIndices;

    // Return the updated stamp object with the index and current values
    return stamp;
}

function classifyStampByBucket(data) {
    
     if (data.index >= 100) {
        data.bucket = "Very High Value";
        } else if (data.index >= 70) {
        data.bucket = "High Value";
        } else if (data.index >= 50) {
        data.bucket = "Moderate Value";
        } else {
        data.bucket = "Low Value";
        }
    return(data)
}

// Assume `maxValues` is an object with normalization values for each index and dataset
const maxValues = { collection: 5, condition: 35, rarity: 35, printingtechniques: 20, edition: 10, historicalsignificance: 30, famousfigures: 10, denomination: 20, perforation: 12, date: 30, collection: 5, printer: 5 };

// Function to aggregate indices by dataset
function aggregateAndNormalize(selectedStamps) {
    const aggregatedData = {}; // Object to store aggregated indices for each dataset

    selectedStamps.forEach(stamp => {
        const datasetKey = stamp.dataset; // Assuming `stamp.dataset` identifies the dataset
        if (!aggregatedData[datasetKey]) {
            aggregatedData[datasetKey] = {}; // Initialize dataset if not present
        }

        Object.keys(stamp.allIndices).forEach(key => {
            if (!aggregatedData[datasetKey][key]) {
                aggregatedData[datasetKey][key] = 0; // Initialize index aggregation
            }
            aggregatedData[datasetKey][key] += stamp.allIndices[key]; // Aggregate values
        });
    });

    // Normalize each dataset
    Object.keys(aggregatedData).forEach(datasetKey => {
        Object.keys(aggregatedData[datasetKey]).forEach(key => {
            aggregatedData[datasetKey][key] /= maxValues[datasetKey]?.[key] || 1; // Normalize values
        });
    });

    return aggregatedData; // Return normalized aggregated data
}

// Handle line clicks
function handleLineClick(data) {
    console.log("Line clicked:", data);

    // Toggle the selected state of the clicked line
    data.selected = !data.selected;

    // Filter out all the stamps in the 'selected' state
    const selectedStamps = cleanedData.filter(stamp => stamp.selected);

    if (selectedStamps.length === 0) {
        console.log("No stamps selected.");
        createRadarChart([], "#radarChart"); // Pass empty data if nothing is selected
        return;
    }

    // Aggregate and normalize data by dataset
    const aggregatedIndices = aggregateAndNormalize(selectedStamps);

    console.log("Aggregated and Normalized Indices:", aggregatedIndices);

    // Pass aggregated indices to the radar chart creation function
    createRadarChart(aggregatedIndices, "#radarChart");
}

function createRadarChart(data, location) {
    // Clear the existing content in the location

    d3.select(location).html("");

    var margin = {top: 100, right: 100, bottom: 100, left: 100},
     width = 400;
    let height = 400;

    const svg = d3.select(location)
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

    
    // Create the radar chart
    const radarData = Object.entries(data).map(([key, value]) => {
        const maxKey = `max${key}`;
        const max = eval(maxKey);
        return { axis: key, value: value / (max || 1), maxValue: max };
    });
    

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
            .attr("d", d => line(d))
            .style("fill", blackColour)
            .style("fill-opacity", 0.1)
            .style("stroke", blackColour)
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
        .style("stroke", secondaryColour)
        .style("stroke-width", "0.4px")
        .style("stroke-opacity", "0.4");

    axis.append("circle") // Add circle to mark the data point on the axis
        .attr("cx", (d, i) => rScale(d.value) * Math.cos(i * angleSlice - Math.PI / 2))
        .attr("cy", (d, i) => rScale(d.value) * Math.sin(i * angleSlice - Math.PI / 2))
        .attr("r", 4)
        .style("fill", blackColour)
        .style("stroke", blackColour)


    axis.append("text")
        .attr("class", "radarLabel")
        .attr("x", (d, i) => rScale(1.15) * Math.cos(i * angleSlice - Math.PI / 2))
        .attr("y", (d, i) => rScale(1.15) * Math.sin(i * angleSlice - Math.PI / 2))
        .text(d => d.axis)
        .style("text-anchor", "middle")
        .style("fill", blackColour)
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .style("font-family", "meursault-variable, serif")
        .style("font-size", "18px")
        .style("font-weight", "400")

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
    console.log(data);
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
            console.log(this.parentNode)
           
            
            const imageSize = 230; // Adjust the size of the image
    // Append the image right under the line
    d3.select(this.parentNode)
    .append("image")
    .attr("id", "center-image") // Give the image an ID for easy removal
    .attr("x", x(d.bucket) - 30) // Position the image
    .attr("y", y(d.orgPrice)-imageSize/2) // Start at the line's position
    .attr("width", imageSize)
    .attr("height", imageSize)
    .attr("href", d.thumbnail) // Use the provided image link
    .style("opacity", 0) // Start with 0 opacity
    .style("pointer-events", "none") // Ignore pointer events on the image
    .transition() // Animate sliding out
    .duration(500)
    .ease(d3.easeCubicOut)
    .attr("y", y(d.orgPrice) + 10) // Final position below the line
    .style("opacity", 1)
    .on("end", function () {
        // Stop the transition once it's complete to prevent further animation on hover
        d3.select(this).interrupt();
    });

        }
    })
    .on("mouseout", function () {
        // Remove the image on mouseout
        d3.select("#center-image").remove();
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



function createTooltip(containerId) {
    // Create a tooltip container
    const tooltip = d3.select(containerId)
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "white")
        .style("border", "1px solid #ccc")
        .style("padding", "10px")
        .style("display", "none")
        .style("pointer-events", "none");

    return {
        show: (event, data) => {
            // Populate tooltip with images
            const content = Array.isArray(data.link) 
                ? data.link.map(link => `<img src="${link}" style="width: 50px; height: 50px; margin: 5px;">`).join("")
                : data.thumbnail ? `<img src="${data.thumbnail}" style="width: 50px; height: 50px;">` 
                : "No images available";

            tooltip
                .html(content)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY + 10) + "px")
                .style("display", "block");
        },
        updatePosition: (event) => {
            // Update tooltip position
            tooltip
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY + 10) + "px");
        },
        hide: () => {
            tooltip.style("display", "none");
        }
    };
}

d3.select("#close-modal").on("click", function() {
    d3.select("#modal").style("display", "none");
});

d3.select("#modal").on("click", function(event) {
    if (event.target === this) {
        d3.select("#modal").style("display", "none");
    }
});


function createParallelChart(data) {
    var margin = { top: 50, right: 20, bottom: 20, left: 0 };
    var width = 1000 - margin.left - margin.right;
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
    
    }

console.log(selectedRanges)
updateLines(selectedRanges);
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
        .style("font-size", "14px");

    // Add axis label
    axisGroup.append("text")
        .attr("class", "axis-label")
        .attr("x", width - 30)
        .attr("y", -30)
        .style("text-anchor", "center")
        .style("fill", tickTextColour)
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .style("font-family", "meursault-variable, serif")
        .text(dim);

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

        // Add reset button
        const resetButton = axisGroup.append("image")
        .attr("x", width + 30)
        .attr("y", -10) // Adjust y-position to align the image correctly
        .attr("width", 100) // Set the width of the image
        .attr("height", 100) // Set the height of the image
        .attr("href", "assets/reset.png") // Path to the reset image
        .style("cursor", "pointer")
        .on("click", function () {
            // Reset selected range
            selectedRanges[dim] = [xScales[dim].domain()[0], xScales[dim].domain()[1]];
    
            // Reset slider handles
            handleLeft.attr("cx", xScales[dim](selectedRanges[dim][0]));
            handleRight.attr("cx", xScales[dim](selectedRanges[dim][1]));
    
            // Reset slider segments
            updateSliderSegments();
    
            // Update visualization and text block
            updateLines();
            updateTextBlock(selectedRanges);
            
        });
    
});


   
}

// Function to update the text block with clickable links
function updateTextBlock(selectedRanges) {
    const textBlock = document.getElementById("textBlock");

    let textContent = `
        <h4> These are all the stamps that fall in the following criteria: <br>
    `;

    // Add each range dynamically to the textContent, with clickable links
    Object.keys(selectedRanges).forEach(rangeKey => {
        const range = selectedRanges[rangeKey];
        const rangeName = capitalizeFirstLetter(rangeKey.replace('Range', ''));

        // Create clickable link for each range
        textContent += `
            <a href="#${rangeKey.replace('Range', '')}Anchor" 
               style="text-decoration: none; color: inherit;" 
               onclick="scrollToAnchor('${rangeKey.replace('Range', '')}Anchor')">
               ${rangeName}: ${Math.floor(range[0])} and ${Math.floor(range[1])}
            </a> <br>`;
    });

    textContent += `</h4>`;

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
