function addItemRow() {
    const table = document.getElementById('itemsTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td><input type="text" class="input-field" placeholder="Item description"></td>
        <td><input type="number" class="input-field" placeholder="1" min="0" onchange="calculateItemTotal(this)"></td>
        <td><input type="number" class="input-field" step="0.01" placeholder="0.00" onchange="calculateItemTotal(this)"></td>
        <td style="text-align: center;"><input type="checkbox" class="checkbox-field"></td>
        <td><input type="number" class="readonly-field" step="0.01" placeholder="0.00" readonly></td>
    `;
}

function addOptionalRow() {
    const table = document.getElementById('optionalTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td><input type="text" class="input-field" placeholder="Optional item description"></td>
        <td><input type="number" class="input-field" placeholder="1" min="0" onchange="calculateOptionalTotal(this)"></td>
        <td><input type="number" class="input-field" step="0.01" placeholder="0.00" onchange="calculateOptionalTotal(this)"></td>
        <td style="text-align: center;"><input type="checkbox" class="checkbox-field"></td>
        <td style="text-align: center;"><input type="checkbox" class="checkbox-field"></td>
        <td><input type="number" class="readonly-field" step="0.01" placeholder="0.00" readonly></td>
    `;
}

function calculateItemTotal(input) {
    const row = input.closest('tr');
    const qty = parseFloat(row.cells[1].querySelector('input').value) || 0;
    const price = parseFloat(row.cells[2].querySelector('input').value) || 0;
    const total = qty * price;
    row.cells[5].querySelector('input').value = total.toFixed(2);
    calculateItemsSubtotal();
    calculateTotals();
}

function calculateLabourTotals() {
    const table = document.getElementById('labourTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let totalHours = 0;
    let normalHours = 0;
    let overtimeHours = 0;
    
    const normalRate = parseFloat(document.getElementById('normalRate').value) || 0;
    const overtimeRate = parseFloat(document.getElementById('overtimeRate').value) || 0;
    
    for (let i = 0; i < rows.length; i++) {
        const hours = parseFloat(rows[i].cells[1].querySelector('input').value) || 0;
        const isOvertime = rows[i].cells[2].querySelector('input[type="checkbox"]').checked;
        
        totalHours += hours;
        if (isOvertime) {
            overtimeHours += hours;
        } else {
            normalHours += hours;
        }
    }
    
    const normalCost = normalHours * normalRate;
    const overtimeCost = overtimeHours * overtimeRate;
    const totalLabourCost = normalCost + overtimeCost;
    
    // Update labour section totals
    document.getElementById('totalHours').textContent = totalHours.toFixed(1);
    document.getElementById('normalHours').textContent = normalHours.toFixed(1);
    document.getElementById('overtimeHours').textContent = overtimeHours.toFixed(1);
    document.getElementById('normalCost').textContent = normalCost.toFixed(2);
    document.getElementById('overtimeCost').textContent = overtimeCost.toFixed(2);
    document.getElementById('labourSubtotal').textContent = totalLabourCost.toFixed(2);
    
    // Update final totals section
    document.getElementById('finalTotalHours').textContent = totalHours.toFixed(1);
    document.getElementById('finalNormalHours').textContent = normalHours.toFixed(1);
    document.getElementById('finalOvertimeHours').textContent = overtimeHours.toFixed(1);
    document.getElementById('finalNormalCost').textContent = normalCost.toFixed(2);
    document.getElementById('finalOvertimeCost').textContent = overtimeCost.toFixed(2);
    document.getElementById('finalTotalLabourCost').textContent = totalLabourCost.toFixed(2);
    document.getElementById('finalLabourSubtotal').textContent = totalLabourCost.toFixed(2);
    
    calculateTotals();
}

function calculateLabourSubtotal() {
    // Labour cost calculation would go here when rates are defined
    const labourSubtotal = 0;
    document.getElementById('labourSubtotal').textContent = labourSubtotal.toFixed(2);
    calculateTotals();
}

function calculateProvisionalsTotal(input) {
    const row = input.closest('tr');
    const qty = parseFloat(row.cells[1].querySelector('input').value) || 0;
    const price = parseFloat(row.cells[2].querySelector('input').value) || 0;
    const total = qty * price;
    row.cells[5].querySelector('input').value = total.toFixed(2);
    calculateProvisionalsSubtotal();
    calculateTotals();
}

function calculateOptionalTotal(input) {
    const row = input.closest('tr');
    const qty = parseFloat(row.cells[1].querySelector('input').value) || 0;
    const price = parseFloat(row.cells[2].querySelector('input').value) || 0;
    const total = qty * price;
    row.cells[5].querySelector('input').value = total.toFixed(2);
    calculateOptionalSubtotal();
    calculateTotals();
}

function calculateProvisionalsSubtotal() {
    const table = document.getElementById('provisionalsTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let subtotal = 0;
    
    for (let i = 0; i < rows.length; i++) {
        const total = parseFloat(rows[i].cells[5].querySelector('input').value) || 0;
        subtotal += total;
    }
    
    document.getElementById('provisionalsSubtotal').textContent = subtotal.toFixed(2);
    document.getElementById('finalProvisionalsSubtotal').textContent = subtotal.toFixed(2);
    calculateTotals();
}

function calculateOptionalSubtotal() {
    const table = document.getElementById('optionalTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let subtotal = 0;
    
    for (let i = 0; i < rows.length; i++) {
        const total = parseFloat(rows[i].cells[5].querySelector('input').value) || 0;
        subtotal += total;
    }
    
    document.getElementById('optionalSubtotal').textContent = subtotal.toFixed(2);
    document.getElementById('finalOptionalSubtotal').textContent = subtotal.toFixed(2);
    calculateTotals();
}

function calculateItemsSubtotal() {
    const table = document.getElementById('itemsTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let subtotal = 0;
    
    for (let i = 0; i < rows.length; i++) {
        const total = parseFloat(rows[i].cells[5].querySelector('input').value) || 0;
        subtotal += total;
    }
    
    document.getElementById('itemsSubtotal').textContent = subtotal.toFixed(2);
    document.getElementById('finalItemsSubtotal').textContent = subtotal.toFixed(2);
}

function calculateTotals() {
    const itemsSubtotal = parseFloat(document.getElementById('itemsSubtotal').textContent) || 0;
    const labourSubtotal = parseFloat(document.getElementById('labourSubtotal').textContent) || 0;
    const provisionalsSubtotal = parseFloat(document.getElementById('provisionalsSubtotal').textContent) || 0;
    
    const subtotalExcGST = itemsSubtotal + labourSubtotal + provisionalsSubtotal;
    const gstAmount = subtotalExcGST * 0.1;
    const totalIncGST = subtotalExcGST + gstAmount;
    
    document.getElementById('subtotalExcGST').textContent = subtotalExcGST.toFixed(2);
    document.getElementById('gstAmount').textContent = gstAmount.toFixed(2);
    document.getElementById('totalIncGST').textContent = totalIncGST.toFixed(2);
}

function generateFileName() {
    const jobName = document.getElementById('jobName').value.trim();
    const dueDate = document.getElementById('quoteDueDate').value;
    
    let fileName = '';
    
    if (jobName) {
        // Clean job name for filename (remove invalid characters)
        const cleanJobName = jobName.replace(/[<>:"/\\|?*]/g, '-');
        fileName += cleanJobName;
    } else {
        fileName += 'Scope_';
    }
    
    if (dueDate) {
        // Format date as DD-MM-YYYY
        const dateObj = new Date(dueDate);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        fileName += `_${day}-${month}-${year}`;
    } else {
        // Use current date if no due date
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        fileName += `_${day}-${month}-${year}`;
    }
    
    return fileName;
}

function updatePageTitle() {
    const fileName = generateFileName();
    document.getElementById('pageTitle').textContent = fileName;
    document.title = fileName;
}

function printQuote() {
    // Update page title for PDF filename
    updatePageTitle();
    
    // Pre-process text areas for printing
    preprocessTextAreasForPrint();
    
    // Auto-save JSON file before printing
    setTimeout(() => {
        try {
            const { url } = saveQuoteToFile();
            
            const a = document.createElement('a');
            a.href = url;
            a.download = generateFileName() + '.json';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            console.log('Auto-save completed before printing');
        } catch (error) {
            console.error('Auto-save failed:', error);
        }
        
        // Print after auto-save attempt
        setTimeout(() => {
            window.print();
            
            // Clean up after printing
            setTimeout(() => {
                cleanupAfterPrint();
            }, 1000);
        }, 100);
    }, 100);
}

function preprocessTextAreasForPrint() {
        const textareas = document.querySelectorAll('textarea, .notes-area, .expanding-field');
    
    textareas.forEach(textarea => {
        if (!textarea.value.trim()) {
            // Set minimum height for empty textareas
            textarea.style.height = '80px';
            textarea.style.minHeight = '80px';
            return;
        }
        
        // Reset height to get accurate scrollHeight
        textarea.style.height = 'auto';
        textarea.style.minHeight = 'auto';
        
        // Get the actual scroll height needed for content
        const scrollHeight = textarea.scrollHeight;
        const padding = 16; // 8px top + 8px bottom padding
        const border = 2; // 1px top + 1px bottom border
        const requiredHeight = scrollHeight + padding + border;
        
        // Set the textarea to show all content
        textarea.style.height = Math.max(requiredHeight, 80) + 'px';
        textarea.style.minHeight = Math.max(requiredHeight, 80) + 'px';
        textarea.style.maxHeight = 'none';
        textarea.style.overflow = 'visible';
        textarea.style.resize = 'none';
        
        // Handle page breaks for large content
        const section = textarea.closest('.section');
        if (section && requiredHeight > 300) {
            section.style.pageBreakBefore = 'always';
            section.classList.add('textarea-page-break');
        }
    });
}

function cleanupAfterPrint() {
    // Remove the print-specific classes and styles
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('textarea-page-break', 'keep-together');
        section.style.pageBreakBefore = '';
        section.style.pageBreakInside = '';
    });
    
    const textareas = document.querySelectorAll('textarea, .notes-area, .expanding-field');
    textareas.forEach(textarea => {
        textarea.style.height = '';
        textarea.style.minHeight = '';
        textarea.style.maxHeight = '';
        textarea.style.overflow = '';
        textarea.style.resize = '';
    });
}

function saveQuoteToFile() {
    const quoteData = {
        timestamp: new Date().toISOString(),
        jobName: document.getElementById('jobName').value,
        contactPerson: document.getElementById('contactPerson').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        quoteDueDate: document.getElementById('quoteDueDate').value,
        businessName: document.getElementById('businessName').value,
        businessAddress: {
            street: document.getElementById('businessStreet').value,
            suburb: document.getElementById('businessSuburb').value,
            state: document.getElementById('businessState').value,
            postcode: document.getElementById('businessPostcode').value,
            country: document.getElementById('businessCountry').value
        },
        siteAddress: {
            street: document.getElementById('siteStreet').value,
            suburb: document.getElementById('siteSuburb').value,
            state: document.getElementById('siteState').value,
            postcode: document.getElementById('sitePostcode').value,
            country: document.getElementById('siteCountry').value
        },
        scopeOfWork: document.getElementById('scopeOfWork').value,
        normalRate: parseFloat(document.getElementById('normalRate').value) || 0,
        overtimeRate: parseFloat(document.getElementById('overtimeRate').value) || 0,
        pricesDiscussed: document.getElementById('pricesDiscussed').value,
        additionalNotes: document.getElementById('additionalNotes').value,
        items: getTableData('itemsTable'),
        labour: getTableData('labourTable'),
        provisionals: getTableData('provisionalsTable'),
        optional: getTableData('optionalTable')
    };

    const jsonData = JSON.stringify(quoteData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    return { blob, url, data: quoteData };
}

function saveQuote() {
    try {
        const { url } = saveQuoteToFile();
        
        const a = document.createElement('a');
        a.href = url;
        a.download = generateFileName() + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('Quote saved successfully!');
    } catch (error) {
        alert('Error saving quote. Please try again.');
        console.error('Save error:', error);
    }
}

function autoExpand(field) {
    field.style.height = 'inherit';
    const computed = window.getComputedStyle(field);
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                 + parseInt(computed.getPropertyValue('padding-top'), 10)
                 + field.scrollHeight
                 + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                 + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
    field.style.height = height + 'px';
}

function loadQuote(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const quoteData = JSON.parse(e.target.result);
            
            // Load basic fields
            document.getElementById('jobName').value = quoteData.jobName || '';
            document.getElementById('contactPerson').value = quoteData.contactPerson || '';
            document.getElementById('phone').value = quoteData.phone || '';
            document.getElementById('email').value = quoteData.email || '';
            document.getElementById('quoteDueDate').value = quoteData.quoteDueDate || '';
            document.getElementById('businessName').value = quoteData.businessName || '';
            
            // Load business address
            if (quoteData.businessAddress) {
                document.getElementById('businessStreet').value = quoteData.businessAddress.street || '';
                document.getElementById('businessSuburb').value = quoteData.businessAddress.suburb || '';
                document.getElementById('businessState').value = quoteData.businessAddress.state || '';
                document.getElementById('businessPostcode').value = quoteData.businessAddress.postcode || '';
                document.getElementById('businessCountry').value = quoteData.businessAddress.country || '';
            }
            
            // Load site address
            if (quoteData.siteAddress) {
                document.getElementById('siteStreet').value = quoteData.siteAddress.street || '';
                document.getElementById('siteSuburb').value = quoteData.siteAddress.suburb || '';
                document.getElementById('siteState').value = quoteData.siteAddress.state || '';
                document.getElementById('sitePostcode').value = quoteData.siteAddress.postcode || '';
                document.getElementById('siteCountry').value = quoteData.siteAddress.country || '';
            }
            
            document.getElementById('scopeOfWork').value = quoteData.scopeOfWork || '';
            document.getElementById('normalRate').value = quoteData.normalRate || 75;
            document.getElementById('overtimeRate').value = quoteData.overtimeRate || 150;
            document.getElementById('pricesDiscussed').value = quoteData.pricesDiscussed || '';
            document.getElementById('additionalNotes').value = quoteData.additionalNotes || '';
            
            // Load table data
            if (quoteData.items) loadTableData('itemsTable', quoteData.items);
            if (quoteData.labour) loadTableData('labourTable', quoteData.labour);
            if (quoteData.provisionals) loadTableData('provisionalsTable', quoteData.provisionals);
            if (quoteData.optional) loadTableData('optionalTable', quoteData.optional);
            
            // Recalculate totals
            calculateItemsSubtotal();
            calculateLabourTotals();
            calculateProvisionalsSubtotal();
            calculateOptionalSubtotal();
            calculateTotals();
            
            alert('Quote loaded successfully!');
        } catch (error) {
            alert('Error loading quote file. Please check the file format.');
            console.error('Error parsing quote file:', error);
        }
    };
    reader.readAsText(file);
}

function getTableData(tableId) {
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    const data = [];
    
    for (let i = 0; i < rows.length; i++) {
        const rowData = [];
        const cells = rows[i].getElementsByTagName('td');
        
        for (let j = 0; j < cells.length; j++) {
            const input = cells[j].querySelector('input[type="text"], input[type="number"]');
            const checkbox = cells[j].querySelector('input[type="checkbox"]');
            const textarea = cells[j].querySelector('textarea');
            
            if (checkbox) {
                rowData.push(checkbox.checked);
            } else if (input) {
                rowData.push(input.value);
            } else if (textarea) {
                rowData.push(textarea.value);
            } else {
                rowData.push('');
            }
        }
        data.push(rowData);
    }
    return data;
}

function loadTableData(tableId, data) {
    const table = document.getElementById(tableId);
    const tbody = table.getElementsByTagName('tbody')[0];
    
    // Clear existing rows except the first one
    while (tbody.rows.length > 1) {
        tbody.deleteRow(1);
    }
    
    // Load data into rows
    for (let i = 0; i < data.length; i++) {
        let row;
        if (i === 0) {
            row = tbody.rows[0];
        } else {
            // Add new row
            if (tableId === 'itemsTable') addItemRow();
            else if (tableId === 'labourTable') addLabourRow();
            else if (tableId === 'provisionalsTable') addProvisionalsRow();
            else if (tableId === 'optionalTable') addOptionalRow();
            row = tbody.rows[tbody.rows.length - 1];
        }
        
        const cells = row.getElementsByTagName('td');
        for (let j = 0; j < data[i].length && j < cells.length; j++) {
            const input = cells[j].querySelector('input[type="text"], input[type="number"]');
            const checkbox = cells[j].querySelector('input[type="checkbox"]');
            const textarea = cells[j].querySelector('textarea');
            
            if (checkbox) {
                checkbox.checked = data[i][j];
            } else if (input) {
                input.value = data[i][j];
            } else if (textarea) {
                textarea.value = data[i][j];
                autoExpand(textarea);
            }
        }
    }
}

// Initialise calculations and add event listeners for dynamic title updates
document.addEventListener('DOMContentLoaded', function() {
    calculateItemsSubtotal();
    calculateLabourTotals();
    calculateProvisionalsSubtotal();
    calculateOptionalSubtotal();
    calculateTotals();
    
    // Update page title when job name or due date changes
    const jobNameField = document.getElementById('jobName');
    const dueDateField = document.getElementById('quoteDueDate');
    
    jobNameField.addEventListener('input', updatePageTitle);
    dueDateField.addEventListener('change', updatePageTitle);
    
    // Set initial title
    updatePageTitle();
    
    // Auto-load sample data from the JSON file provided
    const sampleData = {
        "timestamp": "2025-07-22T13:43:08.443Z",
        "jobName": "Location - Work Description ",
        "contactPerson": "Alan",
        "phone": "12345678",
        "email": "alan@alan.com",
        "quoteDueDate": "2025-07-29",
        "businessName": "Contructing Constructions",
        "businessAddress": {
            "street": "13 alan st",
            "suburb": "Alanville",
            "state": "ALN",
            "postcode": "1234",
            "country": "Australia"
        },
        "siteAddress": {
            "street": "15 Jobsite St",
            "suburb": "Jobsiteville",
            "state": "JSV",
            "postcode": "4321",
            "country": "Australia"
        },
        "scopeOfWork": "Doing stuff to fix things\n- 5 things\n- some work on weekend\n- things are broken\n- went there and fix things already\n- found faults",
        "normalRate": 75,
        "overtimeRate": 220,
        "pricesDiscussed": "haven't spoken to client about costs, ",
        "additionalNotes": "here's some extra notes to tie it all together and what is to be concentrated on once tender/quote done",
        "items": [
            ["vsd 3ph 5kW", "7", "600", false, false, "4200.00"],
            ["SWB - 400A", "1", "90000", true, false, "90000.00"],
            ["new equipment type 1", "4", "700", false, false, "2800.00"]
        ],
        "labour": [
            ["sparky", "10", false, ""],
            ["pm", "5", false, ""],
            ["sparky x 2", "20", true, "2 guys for 10 hours doing out of hours work"]
        ],
        "provisionals": [
            ["back-up generator - 7kVA", "1", "3000", false, false, "3000.00"],
            ["extra guy for Geni works", "1", "175", false, false, "175.00"]
        ],
        "optional": [
            ["larger SWB - 450A", "1", "120000", false, false, "120000.00"],
            ["extra DSB", "1", "30000", false, false, "30000.00"]
        ]
    };
    
    // Load the sample data automatically
    setTimeout(() => {
        loadSampleData(sampleData);
    }, 500);
});

function loadSampleData(quoteData) {
    try {
        // Load basic fields
        document.getElementById('jobName').value = quoteData.jobName || '';
        document.getElementById('contactPerson').value = quoteData.contactPerson || '';
        document.getElementById('phone').value = quoteData.phone || '';
        document.getElementById('email').value = quoteData.email || '';
        document.getElementById('quoteDueDate').value = quoteData.quoteDueDate || '';
        document.getElementById('businessName').value = quoteData.businessName || '';
        
        // Load business address
        if (quoteData.businessAddress) {
            document.getElementById('businessStreet').value = quoteData.businessAddress.street || '';
            document.getElementById('businessSuburb').value = quoteData.businessAddress.suburb || '';
            document.getElementById('businessState').value = quoteData.businessAddress.state || '';
            document.getElementById('businessPostcode').value = quoteData.businessAddress.postcode || '';
            document.getElementById('businessCountry').value = quoteData.businessAddress.country || '';
        }
        
        // Load site address
        if (quoteData.siteAddress) {
            document.getElementById('siteStreet').value = quoteData.siteAddress.street || '';
            document.getElementById('siteSuburb').value = quoteData.siteAddress.suburb || '';
            document.getElementById('siteState').value = quoteData.siteAddress.state || '';
            document.getElementById('sitePostcode').value = quoteData.siteAddress.postcode || '';
            document.getElementById('siteCountry').value = quoteData.siteAddress.country || '';
        }
        
        document.getElementById('scopeOfWork').value = quoteData.scopeOfWork || '';
        document.getElementById('normalRate').value = quoteData.normalRate || 75;
        document.getElementById('overtimeRate').value = quoteData.overtimeRate || 220;
        document.getElementById('pricesDiscussed').value = quoteData.pricesDiscussed || '';
        document.getElementById('additionalNotes').value = quoteData.additionalNotes || '';
        
        // Load table data
        if (quoteData.items) loadTableData('itemsTable', quoteData.items);
        if (quoteData.labour) loadTableData('labourTable', quoteData.labour);
        if (quoteData.provisionals) loadTableData('provisionalsTable', quoteData.provisionals);
        if (quoteData.optional) loadTableData('optionalTable', quoteData.optional);
        
        // Recalculate totals
        calculateItemsSubtotal();
        calculateLabourTotals();
        calculateProvisionalsSubtotal();
        calculateOptionalSubtotal();
        calculateTotals();
        
        console.log('Sample data loaded successfully');
    } catch (error) {
        console.error('Error loading sample data:', error);
    }


function addItemRow() {
    const table = document.getElementById('itemsTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td><input type="text" class="input-field" placeholder="Item description"></td>
        <td><input type="number" class="input-field" placeholder="1" min="0" onchange="calculateItemTotal(this)"></td>
        <td><input type="number" class="input-field" step="0.01" placeholder="0.00" onchange="calculateItemTotal(this)"></td>
        <td style="text-align: center;"><input type="checkbox" class="checkbox-field"></td>
        <td style="text-align: center;"><input type="checkbox" class="checkbox-field"></td>
        <td><input type="number" class="readonly-field" step="0.01" placeholder="0.00" readonly></td>
    `;
}

function addLabourRow() {
    const table = document.getElementById('labourTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td><input type="text" class="input-field" placeholder="Labour description"></td>
        <td><input type="number" class="input-field" step="0.5" placeholder="0.0" onchange="calculateLabourTotals()"></td>
        <td style="text-align: center;">
            <input type="checkbox" class="checkbox-field" onchange="calculateLabourTotals()">
        </td>
        <td><textarea class="expanding-field" placeholder="" oninput="autoExpand(this)"></textarea></td>
    `;
}

function addProvisionalsRow() {
    const table = document.getElementById('provisionalsTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td><input type="text" class="input-field" placeholder="Provisional item description"></td>
        <td><input type="number" class="input-field" placeholder="1" min="0" onchange="calculateProvisionalsTotal(this)"></td>
        <td><input type="number" class="input-field" step="0.01" placeholder="0.00" onchange="calculateProvisionalsTotal(this)"></td>
        <td style="text-align: center;"><input type="checkbox" class="checkbox-field"></td>
        <td style="text-align: center;"><input type="checkbox" class="checkbox-field"></td>
        <td><input type="number" class="readonly-field" step="0.01" placeholder="0.00" readonly></td>
    `;
}

function addOptionalRow() {
    const table = document.getElementById('optionalTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td><input type="text" class="input-field" placeholder="Optional item description"></td>
        <td><input type="number" class="input-field" placeholder="1" min="0" onchange="calculateOptionalTotal(this)"></td>
        <td><input type="number" class="input-field" step="0.01" placeholder="0.00" onchange="calculateOptionalTotal(this)"></td>
        <td style="text-align: center;"><input type="checkbox" class="checkbox-field"></td>
        <td style="text-align: center;"><input type="checkbox" class="checkbox-field"></td>
        <td><input type="number" class="readonly-field" step="0.01" placeholder="0.00" readonly></td>
    `;
}

function calculateItemTotal(input) {
    const row = input.closest('tr');
    const qty = parseFloat(row.cells[1].querySelector('input').value) || 0;
    const price = parseFloat(row.cells[2].querySelector('input').value) || 0;
    const total = qty * price;
    row.cells[5].querySelector('input').value = total.toFixed(2);
    calculateItemsSubtotal();
    calculateTotals();
}

function calculateLabourTotals() {
    const table = document.getElementById('labourTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let totalHours = 0;
    let normalHours = 0;
    let overtimeHours = 0;
    
    const normalRate = parseFloat(document.getElementById('normalRate').value) || 0;
    const overtimeRate = parseFloat(document.getElementById('overtimeRate').value) || 0;
    
    for (let i = 0; i < rows.length; i++) {
        const hours = parseFloat(rows[i].cells[1].querySelector('input').value) || 0;
        const isOvertime = rows[i].cells[2].querySelector('input[type="checkbox"]').checked;
        
        totalHours += hours;
        if (isOvertime) {
            overtimeHours += hours;
        } else {
            normalHours += hours;
        }
    }
    
    const normalCost = normalHours * normalRate;
    const overtimeCost = overtimeHours * overtimeRate;
    const totalLabourCost = normalCost + overtimeCost;
    
    // Update labour section totals
    document.getElementById('totalHours').textContent = totalHours.toFixed(1);
    document.getElementById('normalHours').textContent = normalHours.toFixed(1);
    document.getElementById('overtimeHours').textContent = overtimeHours.toFixed(1);
    document.getElementById('normalCost').textContent = normalCost.toFixed(2);
    document.getElementById('overtimeCost').textContent = overtimeCost.toFixed(2);
    document.getElementById('labourSubtotal').textContent = totalLabourCost.toFixed(2);
    
    // Update final totals section
    document.getElementById('finalTotalHours').textContent = totalHours.toFixed(1);
    document.getElementById('finalNormalHours').textContent = normalHours.toFixed(1);
    document.getElementById('finalOvertimeHours').textContent = overtimeHours.toFixed(1);
    document.getElementById('finalNormalCost').textContent = normalCost.toFixed(2);
    document.getElementById('finalOvertimeCost').textContent = overtimeCost.toFixed(2);
    document.getElementById('finalTotalLabourCost').textContent = totalLabourCost.toFixed(2);
    document.getElementById('finalLabourSubtotal').textContent = totalLabourCost.toFixed(2);
    
    calculateTotals();
}

function calculateLabourSubtotal() {
    // Labour cost calculation would go here when rates are defined
    const labourSubtotal = 0;
    document.getElementById('labourSubtotal').textContent = labourSubtotal.toFixed(2);
    calculateTotals();
}

function calculateProvisionalsTotal(input) {
    const row = input.closest('tr');
    const qty = parseFloat(row.cells[1].querySelector('input').value) || 0;
    const price = parseFloat(row.cells[2].querySelector('input').value) || 0;
    const total = qty * price;
    row.cells[5].querySelector('input').value = total.toFixed(2);
    calculateProvisionalsSubtotal();
    calculateTotals();
}

function calculateOptionalTotal(input) {
    const row = input.closest('tr');
    const qty = parseFloat(row.cells[1].querySelector('input').value) || 0;
    const price = parseFloat(row.cells[2].querySelector('input').value) || 0;
    const total = qty * price;
    row.cells[5].querySelector('input').value = total.toFixed(2);
    calculateOptionalSubtotal();
    calculateTotals();
}

function calculateProvisionalsSubtotal() {
    const table = document.getElementById('provisionalsTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let subtotal = 0;
    
    for (let i = 0; i < rows.length; i++) {
        const total = parseFloat(rows[i].cells[5].querySelector('input').value) || 0;
        subtotal += total;
    }
    
    document.getElementById('provisionalsSubtotal').textContent = subtotal.toFixed(2);
    document.getElementById('finalProvisionalsSubtotal').textContent = subtotal.toFixed(2);
    calculateTotals();
}

function calculateOptionalSubtotal() {
    const table = document.getElementById('optionalTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let subtotal = 0;
    
    for (let i = 0; i < rows.length; i++) {
        const total = parseFloat(rows[i].cells[5].querySelector('input').value) || 0;
        subtotal += total;
    }
    
    document.getElementById('optionalSubtotal').textContent = subtotal.toFixed(2);
    document.getElementById('finalOptionalSubtotal').textContent = subtotal.toFixed(2);
    calculateTotals();
}

function calculateItemsSubtotal() {
    const table = document.getElementById('itemsTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let subtotal = 0;
    
    for (let i = 0; i < rows.length; i++) {
        const total = parseFloat(rows[i].cells[5].querySelector('input').value) || 0;
        subtotal += total;
    }
    
    document.getElementById('itemsSubtotal').textContent = subtotal.toFixed(2);
    document.getElementById('finalItemsSubtotal').textContent = subtotal.toFixed(2);
}

function calculateTotals() {
    const itemsSubtotal = parseFloat(document.getElementById('itemsSubtotal').textContent) || 0;
    const labourSubtotal = parseFloat(document.getElementById('labourSubtotal').textContent) || 0;
    const provisionalsSubtotal = parseFloat(document.getElementById('provisionalsSubtotal').textContent) || 0;
    
    const subtotalExcGST = itemsSubtotal + labourSubtotal + provisionalsSubtotal;
    const gstAmount = subtotalExcGST * 0.1;
    const totalIncGST = subtotalExcGST + gstAmount;
    
    document.getElementById('subtotalExcGST').textContent = subtotalExcGST.toFixed(2);
    document.getElementById('gstAmount').textContent = gstAmount.toFixed(2);
    document.getElementById('totalIncGST').textContent = totalIncGST.toFixed(2);
}

function generateFileName() {
    const jobName = document.getElementById('jobName').value.trim();
    const dueDate = document.getElementById('quoteDueDate').value;
    
    let fileName = '';
    
    if (jobName) {
        // Clean job name for filename (remove invalid characters)
        const cleanJobName = jobName.replace(/[<>:"/\\|?*]/g, '-');
        fileName += cleanJobName;
    } else {
        fileName += 'Scope_';
    }
    
    if (dueDate) {
        // Format date as DD-MM-YYYY
        const dateObj = new Date(dueDate);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        fileName += `_${day}-${month}-${year}`;
    } else {
        // Use current date if no due date
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        fileName += `_${day}-${month}-${year}`;
    }
    
    return fileName;
}

function updatePageTitle() {
    const fileName = generateFileName();
    document.getElementById('pageTitle').textContent = fileName;
    document.title = fileName;
}

function printQuote() {
    // Update page title for PDF filename
    updatePageTitle();
    
    // Pre-process text areas for printing
    preprocessTextAreasForPrint();
    
    // Auto-save JSON file before printing
    setTimeout(() => {
        try {
            const { url } = saveQuoteToFile();
            
            const a = document.createElement('a');
            a.href = url;
            a.download = generateFileName() + '.json';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            console.log('Auto-save completed before printing');
        } catch (error) {
            console.error('Auto-save failed:', error);
        }
        
        // Print after auto-save attempt
        setTimeout(() => {
            window.print();
            
            // Clean up after printing
            setTimeout(() => {
                cleanupAfterPrint();
            }, 1000);
        }, 100);
    }, 100);
}

function preprocessTextAreasForPrint() {
    const textareas = document.querySelectorAll('textarea, .notes-area, .expanding-field');

    textareas.forEach(textarea => {
        if (!textarea.value.trim()) {
            // Set minimum height for empty textareas
            textarea.style.height = '80px';
            textarea.style.minHeight = '80px';
            return;
        }
        
        // Reset height to get accurate scrollHeight
        textarea.style.height = 'auto';
        textarea.style.minHeight = 'auto';
        
        // Get the actual scroll height needed for content
        const scrollHeight = textarea.scrollHeight;
        const padding = 16; // 8px top + 8px bottom padding
        const border = 2; // 1px top + 1px bottom border
        const requiredHeight = scrollHeight + padding + border;
        
        // Set the textarea to show all content
        textarea.style.height = Math.max(requiredHeight, 80) + 'px';
        textarea.style.minHeight = Math.max(requiredHeight, 80) + 'px';
        textarea.style.maxHeight = 'none';
        textarea.style.overflow = 'visible';
        textarea.style.resize = 'none';
        
        // Handle page breaks for large content
        const section = textarea.closest('.section');
        if (section && requiredHeight > 300) {
            section.style.pageBreakBefore = 'always';
            section.classList.add('textarea-page-break');
        }
    });
}

function cleanupAfterPrint() {
    // Remove the print-specific classes and styles
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('textarea-page-break', 'keep-together');
        section.style.pageBreakBefore = '';
        section.style.pageBreakInside = '';
    });
    
    const textareas = document.querySelectorAll('textarea, .notes-area, .expanding-field');
    textareas.forEach(textarea => {
        textarea.style.height = '';
        textarea.style.minHeight = '';
        textarea.style.maxHeight = '';
        textarea.style.overflow = '';
        textarea.style.resize = '';
    });
}

function saveQuoteToFile() {
    const quoteData = {
        timestamp: new Date().toISOString(),
        jobName: document.getElementById('jobName').value,
        contactPerson: document.getElementById('contactPerson').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        quoteDueDate: document.getElementById('quoteDueDate').value,
        businessName: document.getElementById('businessName').value,
        businessAddress: {
            street: document.getElementById('businessStreet').value,
            suburb: document.getElementById('businessSuburb').value,
            state: document.getElementById('businessState').value,
            postcode: document.getElementById('businessPostcode').value,
            country: document.getElementById('businessCountry').value
        },
        siteAddress: {
            street: document.getElementById('siteStreet').value,
            suburb: document.getElementById('siteSuburb').value,
            state: document.getElementById('siteState').value,
            postcode: document.getElementById('sitePostcode').value,
            country: document.getElementById('siteCountry').value
        },
        scopeOfWork: document.getElementById('scopeOfWork').value,
        normalRate: parseFloat(document.getElementById('normalRate').value) || 0,
        overtimeRate: parseFloat(document.getElementById('overtimeRate').value) || 0,
        pricesDiscussed: document.getElementById('pricesDiscussed').value,
        additionalNotes: document.getElementById('additionalNotes').value,
        items: getTableData('itemsTable'),
        labour: getTableData('labourTable'),
        provisionals: getTableData('provisionalsTable'),
        optional: getTableData('optionalTable')
    };

    const jsonData = JSON.stringify(quoteData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    return { blob, url, data: quoteData };
}

function saveQuote() {
    try {
        const { url } = saveQuoteToFile();
        
        const a = document.createElement('a');
        a.href = url;
        a.download = generateFileName() + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('Quote saved successfully!');
    } catch (error) {
        alert('Error saving quote. Please try again.');
        console.error('Save error:', error);
    }
}

function autoExpand(field) {
    field.style.height = 'inherit';
    const computed = window.getComputedStyle(field);
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                 + parseInt(computed.getPropertyValue('padding-top'), 10)
                 + field.scrollHeight
                 + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                 + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
    field.style.height = height + 'px';
}

function loadQuote(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const quoteData = JSON.parse(e.target.result);
            
            // Load basic fields
            document.getElementById('jobName').value = quoteData.jobName || '';
            document.getElementById('contactPerson').value = quoteData.contactPerson || '';
            document.getElementById('phone').value = quoteData.phone || '';
            document.getElementById('email').value = quoteData.email || '';
            document.getElementById('quoteDueDate').value = quoteData.quoteDueDate || '';
            document.getElementById('businessName').value = quoteData.businessName || '';
            
            // Load business address
            if (quoteData.businessAddress) {
                document.getElementById('businessStreet').value = quoteData.businessAddress.street || '';
                document.getElementById('businessSuburb').value = quoteData.businessAddress.suburb || '';
                document.getElementById('businessState').value = quoteData.businessAddress.state || '';
                document.getElementById('businessPostcode').value = quoteData.businessAddress.postcode || '';
                document.getElementById('businessCountry').value = quoteData.businessAddress.country || '';
            }
            
            // Load site address
            if (quoteData.siteAddress) {
                document.getElementById('siteStreet').value = quoteData.siteAddress.street || '';
                document.getElementById('siteSuburb').value = quoteData.siteAddress.suburb || '';
                document.getElementById('siteState').value = quoteData.siteAddress.state || '';
                document.getElementById('sitePostcode').value = quoteData.siteAddress.postcode || '';
                document.getElementById('siteCountry').value = quoteData.siteAddress.country || '';
            }
            
            document.getElementById('scopeOfWork').value = quoteData.scopeOfWork || '';
            document.getElementById('normalRate').value = quoteData.normalRate || 75;
            document.getElementById('overtimeRate').value = quoteData.overtimeRate || 150;
            document.getElementById('pricesDiscussed').value = quoteData.pricesDiscussed || '';
            document.getElementById('additionalNotes').value = quoteData.additionalNotes || '';
            
            // Load table data
            if (quoteData.items) loadTableData('itemsTable', quoteData.items);
            if (quoteData.labour) loadTableData('labourTable', quoteData.labour);
            if (quoteData.provisionals) loadTableData('provisionalsTable', quoteData.provisionals);
            if (quoteData.optional) loadTableData('optionalTable', quoteData.optional);
            
            // Recalculate totals
            calculateItemsSubtotal();
            calculateLabourTotals();
            calculateProvisionalsSubtotal();
            calculateOptionalSubtotal();
            calculateTotals();
            
            alert('Quote loaded successfully!');
        } catch (error) {
            alert('Error loading quote file. Please check the file format.');
            console.error('Error parsing quote file:', error);
        }
    };
    reader.readAsText(file);
}

function getTableData(tableId) {
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    const data = [];
    
    for (let i = 0; i < rows.length; i++) {
        const rowData = [];
        const cells = rows[i].getElementsByTagName('td');
        
        for (let j = 0; j < cells.length; j++) {
            const input = cells[j].querySelector('input[type="text"], input[type="number"]');
            const checkbox = cells[j].querySelector('input[type="checkbox"]');
            const textarea = cells[j].querySelector('textarea');
            
            if (checkbox) {
                rowData.push(checkbox.checked);
            } else if (input) {
                rowData.push(input.value);
            } else if (textarea) {
                rowData.push(textarea.value);
            } else {
                rowData.push('');
            }
        }
        data.push(rowData);
    }
    return data;
}

function loadTableData(tableId, data) {
    const table = document.getElementById(tableId);
    const tbody = table.getElementsByTagName('tbody')[0];
    
    // Clear existing rows except the first one
    while (tbody.rows.length > 1) {
        tbody.deleteRow(1);
    }
    
    // Load data into rows
    for (let i = 0; i < data.length; i++) {
        let row;
        if (i === 0) {
            row = tbody.rows[0];
        } else {
            // Add new row
            if (tableId === 'itemsTable') addItemRow();
            else if (tableId === 'labourTable') addLabourRow();
            else if (tableId === 'provisionalsTable') addProvisionalsRow();
            else if (tableId === 'optionalTable') addOptionalRow();
            row = tbody.rows[tbody.rows.length - 1];
        }
        
        const cells = row.getElementsByTagName('td');
        for (let j = 0; j < data[i].length && j < cells.length; j++) {
            const input = cells[j].querySelector('input[type="text"], input[type="number"]');
            const checkbox = cells[j].querySelector('input[type="checkbox"]');
            const textarea = cells[j].querySelector('textarea');
            
            if (checkbox) {
                checkbox.checked = data[i][j];
            } else if (input) {
                input.value = data[i][j];
            } else if (textarea) {
                textarea.value = data[i][j];
                autoExpand(textarea);
            }
        }
    }
}

// Initialise calculations and add event listeners for dynamic title updates
document.addEventListener('DOMContentLoaded', function() {
    calculateItemsSubtotal();
    calculateLabourTotals();
    calculateProvisionalsSubtotal();
    calculateOptionalSubtotal();
    calculateTotals();
    
    // Update page title when job name or due date changes
    const jobNameField = document.getElementById('jobName');
    const dueDateField = document.getElementById('quoteDueDate');
    
    jobNameField.addEventListener('input', updatePageTitle);
    dueDateField.addEventListener('change', updatePageTitle);
    
    // Set initial title
    updatePageTitle();
    
    // Auto-load sample data from the JSON file provided
    const sampleData = {
        "timestamp": "2025-07-22T13:43:08.443Z",
        "jobName": "Location - Work Description ",
        "contactPerson": "Alan",
        "phone": "12345678",
        "email": "alan@alan.com",
        "quoteDueDate": "2025-07-29",
        "businessName": "Contructing Constructions",
        "businessAddress": {
            "street": "13 alan st",
            "suburb": "Alanville",
            "state": "ALN",
            "postcode": "1234",
            "country": "Australia"
        },
        "siteAddress": {
            "street": "15 Jobsite St",
            "suburb": "Jobsiteville",
            "state": "JSV",
            "postcode": "4321",
            "country": "Australia"
        },
        "scopeOfWork": "Doing stuff to fix things\n- 5 things\n- some work on weekend\n- things are broken\n- went there and fix things already\n- found faults",
        "normalRate": 75,
        "overtimeRate": 220,
        "pricesDiscussed": "haven't spoken to client about costs, ",
        "additionalNotes": "here's some extra notes to tie it all together and what is to be concentrated on once tender/quote done",
        "items": [
            ["vsd 3ph 5kW", "7", "600", false, false, "4200.00"],
            ["SWB - 400A", "1", "90000", true, false, "90000.00"],
            ["new equipment type 1", "4", "700", false, false, "2800.00"]
        ],
        "labour": [
            ["sparky", "10", false, ""],
            ["pm", "5", false, ""],
            ["sparky x 2", "20", true, "2 guys for 10 hours doing out of hours work"]
        ],
        "provisionals": [
            ["back-up generator - 7kVA", "1", "3000", false, false, "3000.00"],
            ["extra guy for Geni works", "1", "175", false, false, "175.00"]
        ],
        "optional": [
            ["larger SWB - 450A", "1", "120000", false, false, "120000.00"],
            ["extra DSB", "1", "30000", false, false, "30000.00"]
        ]
    };
    
    // Load the sample data automatically
    setTimeout(() => {
        loadSampleData(sampleData);
    }, 500);
});

function loadSampleData(quoteData) {
    try {
        // Load basic fields
        document.getElementById('jobName').value = quoteData.jobName || '';
        document.getElementById('contactPerson').value = quoteData.contactPerson || '';
        document.getElementById('phone').value = quoteData.phone || '';
        document.getElementById('email').value = quoteData.email || '';
        document.getElementById('quoteDueDate').value = quoteData.quoteDueDate || '';
        document.getElementById('businessName').value = quoteData.businessName || '';
        
        // Load business address
        if (quoteData.businessAddress) {
            document.getElementById('businessStreet').value = quoteData.businessAddress.street || '';
            document.getElementById('businessSuburb').value = quoteData.businessAddress.suburb || '';
            document.getElementById('businessState').value = quoteData.businessAddress.state || '';
            document.getElementById('businessPostcode').value = quoteData.businessAddress.postcode || '';
            document.getElementById('businessCountry').value = quoteData.businessAddress.country || '';
        }
        
        // Load site address
        if (quoteData.siteAddress) {
            document.getElementById('siteStreet').value = quoteData.siteAddress.street || '';
            document.getElementById('siteSuburb').value = quoteData.siteAddress.suburb || '';
            document.getElementById('siteState').value = quoteData.siteAddress.state || '';
            document.getElementById('sitePostcode').value = quoteData.siteAddress.postcode || '';
            document.getElementById('siteCountry').value = quoteData.siteAddress.country || '';
        }
        
        document.getElementById('scopeOfWork').value = quoteData.scopeOfWork || '';
        document.getElementById('normalRate').value = quoteData.normalRate || 75;
        document.getElementById('overtimeRate').value = quoteData.overtimeRate || 220;
        document.getElementById('pricesDiscussed').value = quoteData.pricesDiscussed || '';
        document.getElementById('additionalNotes').value = quoteData.additionalNotes || '';
        
        // Load table data
        if (quoteData.items) loadTableData('itemsTable', quoteData.items);
        if (quoteData.labour) loadTableData('labourTable', quoteData.labour);
        if (quoteData.provisionals) loadTableData('provisionalsTable', quoteData.provisionals);
        if (quoteData.optional) loadTableData('optionalTable', quoteData.optional);
        
        // Recalculate totals
        calculateItemsSubtotal();
        calculateLabourTotals();
        calculateProvisionalsSubtotal();
        calculateOptionalSubtotal();
        calculateTotals();
        
        console.log('Sample data loaded successfully');
    } catch (error) {
        console.error('Error loading sample data:', error);
    }
}