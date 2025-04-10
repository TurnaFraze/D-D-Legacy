document.getElementById("calculateStats").addEventListener("click", function() {
    
    // Populate select dropdowns dynamically (0-10)
    document.querySelectorAll('select').forEach(select => {
        if (select.children.length === 0) {
            for (let i = 0; i <= 10; i++) {
                let option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                select.appendChild(option);
            }
        }
    });

    // Get the scores from the dropdowns
    const scores = [
        "pp1", "pp2", "wa1", "wa2", "ci1", "ci2",
        "am1", "am2", "gb1", "gb2", "ti1", "ti2"
    ].map(id => parseInt(document.getElementById(id).value));
    
    // Calculate D&D stats correctly using all 12 scores
    const dndStats = scores.map(score => Math.floor((score * 2) + 6));
    
    const statNames = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
    
    const stats = {};
    for (let i = 0; i < statNames.length; i++) {
        stats[statNames[i]] = dndStats[i];
    }
    
    // Display D&D stats
    for (const [key, value] of Object.entries(stats)) {
        document.getElementById(key.toLowerCase()).value = value;
    }

    // Alignment calculation logic
    function calculateAlignment(scores) {
        const [pp1, pp2, wa1, wa2, ci1, ci2, am1, am2, gb1, gb2, ti1, ti2] = scores;
        
        const goodScore = (ci1 + gb2 + ti1) / 3;
        const evilScore = (pp2 + am2 + ti2) / 3;

        const lawfulScore = (pp1 + am1 + gb1) / 3;
        const chaoticScore = (wa1 + ci2 + ci1) / 3;
        
        let moral = goodScore > evilScore ? "Good" : evilScore > goodScore ? "Evil" : "Neutral";
        let ethical = lawfulScore > chaoticScore ? "Lawful" : chaoticScore > lawfulScore ? "Chaotic" : "Neutral";
        
        if (Math.abs(goodScore - evilScore) < 1 && Math.abs(lawfulScore - chaoticScore) < 1) {
            return "True Neutral";
        }
        
        return `${ethical} ${moral}`;
    }

    // Display the alignment
    const alignment = calculateAlignment(scores);
    const alignmentElement = document.getElementById("alignment");
    alignmentElement.textContent = `Alignment: ${alignment}`;
    
    // Styling: Color based on alignment
    const alignmentColors = {
        "Lawful Good": "#4CAF50",
        "Neutral Good": "#2196F3",
        "Chaotic Good": "#FFC107",
        "Lawful Neutral": "#9C27B0",
        "True Neutral": "#607D8B",
        "Chaotic Neutral": "#FF9800",
        "Lawful Evil": "#E91E63",
        "Neutral Evil": "#F44336",
        "Chaotic Evil": "#B71C1C"
    };

    alignmentElement.style.color = alignmentColors[alignment] || "#000";
});
