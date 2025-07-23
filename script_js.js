// Quote Application
class QuoteManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.calculateAllTotals();
        this.updatePageTitle();
    }

    setupEventListeners() {
        // Job name and due date changes
        const jobNameField = document.getElementById('jobName');
        const dueDateField = document.getElementById('quoteDueDate');
        
        jobNameField?.addEventListener('input', () => this.updatePageTitle());
        dueDateField?.addEventListener('change', () => this.updatePageTitle());

        // Rate changes
        const normalRateField = document.getElementById('normalRate');
        const overtimeRateField = document.getElementById('overtimeRate');
        
        normalRateField?.addEventListener('change', () => this.calculateLabourTotals());
        overtimeRateField?.addEventListener('change', () => this.calculateLabourTotals());

        // Table input changes
        this.setupTableEventListeners();
        
        // Auto-expand textareas
        this.setupTextareaAutoExpand();
    }

    setupTableEventListeners() {
        // Items table
        this.addTableListeners('itemsTable', (input) => this.calculateItemTotal(input));
        
        // Labour table
        this.addTableListeners('labourTable', () => this.calculateLabourTotals());
        
        // Provisionals table
        this.addTableListeners('provisionalsTable', (input) => this.calculateProvisionalsTotal(input));
        
        // Optional table
        this.addTableListeners('optionalTable', (input) => this.calculateOptionalTotal(input));
    }

    addTableListeners(tableId, callback) {
        const table = document.getElementById(tableId);
        if (!table) return;

        table.addEventListener('input', (e) => {
            if (e.target.matches('input[type="number"], input[type="checkbox"]')) {
                callback(e.target);
            }
        });
    }

    setupTextareaAutoExpand() {
        document.addEventListener('input', (e) => {
            if (e.target.matches('textarea, .expanding-field')) {
                this.autoExpand(e.target);
            }
        });
    }

    // Table Management
    addItemRow() {
        const table = document.getElementById('itemsTable');
        const tbody = table.querySelector('tbody');
        const newRow = tbody.insertRow();
        
        newRow.innerHTML = `
            <td><input type="text" class="input-field" placeholder="Item description"></td>
            <td><input type="number" class="input-field" placeholder="1" min="0"></td>
            <td><input type="number" class="input-field" step="0.01" placeholder="0.00"></td>
            <td><input type="checkbox" class="checkbox-field"></td>
            <td><input type="checkbox" class="checkbox-field"></td>
            <td><input type="number" class="readonly-field" step="0.01" placeholder="0.00" readonly></td>
        `;
    }

    addLabourRow() {
        const table = document.getElementById('labourTable');
        const tbody = table.querySelector('tbody');
        const newRow = tbody.insertRow();
        
        newRow.innerHTML = `
            <td><input type="text" class="input-field" placeholder="Labour description"></td>
            <td><input type="number" class="input-field" step="0.5" placeholder="0.0"></td>
            <td><input type="checkbox" class="checkbox-field"></td>
            <td><textarea class="expanding-field" placeholder=""></textarea></td>
        `;
    }

    addProvisionalsRow() {
        const table = document.getElementById('provisionalsTable');
        const tbody = table.querySelector('tbody');
        const newRow = tbody.insertRow();
        
        newRow.innerHTML = `
            <td><input type="text" class="input-field" placeholder="Provisional item description"></td>
            <td><input type="number" class="input-field" placeholder="1" min="0"></td>
            <td><input type="number" class="input-field" step="0.01" placeholder="0.00"></td>
            <td><input type="checkbox" class="checkbox-field"></td>
            <td><input type="checkbox" class="checkbox-field"></td>
            <td><input type="number" class="readonly-field" step="0.01" placeholder="0.00" readonly></td>
        `;
    }

    addOptionalRow() {
        const table = document.getElementById('optionalTable');
        const tbody = table.querySelector('tbody');
        const newRow = tbody.insertRow();
        
        newRow.innerHTML = `
            <td><input type="text" class="input-field" placeholder="Optional item description"></td>
            <td><input type="number" class="input-field" placeholder="1" min="0"></td>
            <td><input type="number" class="input-field" step="0.01" placeholder="0.00"></td>
            <td><input type="checkbox" class="checkbox-field"></td>
            <td><input type="checkbox" class="checkbox-field"></td>
            <td><input type="number" class="readonly-field" step="0.01" placeholder="0.00" readonly></td>
        `;
    }

    // Calculations
    calculateItemTotal(input) {
        const row = input.closest('tr');
        if (!row) return;
        
        const cells = row.cells;
        const qty = parseFloat(cells[1].querySelector('input').value) || 0;
        const price = parseFloat(cells[2].querySelector('input').value) || 0;
        const total = qty * price;
        
        cells[5].querySelector('input').value = total.toFixed(2);
        this.calculateItemsSubtotal();
        this.calculateTotals();
    }

    calculateProvisionalsTotal(input) {
        const row = input.closest('tr');
        if (!row) return;
        
        const cells = row.cells;
        const qty = parseFloat(cells[1].querySelector('input').value) || 0;
        const price = parseFloat(cells[2].querySelector('input').value) || 0;
        const total = qty * price;
        
        cells[5].querySelector('input').value = total.toFixed(2);
        this.calculateProvisionalsSubtotal();
        this.calculateTotals();
    }

    calculateOptionalTotal(input) {
        const row = input.closest('tr');
        if (!row) return;
        
        const cells = row.cells;
        const qty = parseFloat(cells[1].querySelector('input').value) || 0;
        const price = parseFloat(cells[2].querySelector('input').value) || 0;
        const total = qty * price;
        
        cells[5].querySelector('input').value = total.toFixed(2);
        this.calculateOptionalSubtotal();
        this.calculateTotals();
    }

    calculateLabourTotals() {
        const table = document.getElementById('labourTable');
        const rows = table.querySelectorAll('tbody tr');
        
        let totalHours = 0;
        let normalHours = 0;
        let overtimeHours = 0;
        
        const normalRate = parseFloat(document.getElementById('normalRate').value) || 0;
        const overtimeRate = parseFloat(document.getElementById('overtimeRate').value) || 0;
        
        rows.forEach(row => {
            const hours = parseFloat(row.cells[1].querySelector('input').value) || 0;
            const isOvertime = row.cells[2].querySelector('input[type="checkbox"]').checked;
            
            totalHours += hours;
            if (isOvertime) {
                overtimeHours += hours;
            } else {
                normalHours += hours;
            }
        });
        
        const normalCost = normalHours * normalRate;
        const overtimeCost = overtimeHours * overtimeRate;
        const totalLabourCost = normalCost + overtimeCost;
        
        // Update labour section totals
        this.updateElement('totalHours', totalHours.toFixed(1));
        this.updateElement('normalHours', normalHours.toFixed(1));
        this.updateElement('overtimeHours', overtimeHours.toFixed(1));
        this.updateElement('normalCost', normalCost.toFixed(2));
        this.updateElement('overtimeCost', overtimeCost.toFixed(2));
        this.updateElement('labourSubtotal', totalLabourCost.toFixed(2));
        
        // Update final totals section
        this.updateElement('finalTotalHours', totalHours.toFixed(1));
        this.updateElement('finalNormalHours', normalHours.toFixed(1));
        this.updateElement('finalOvertimeHours', overtimeHours.toFixed(1));
        this.updateElement('finalNormalCost', normalCost.toFixed(2));
        this.updateElement('finalOvertimeCost', overtimeCost.toFixed(2));
        this.updateElement('finalTotalLabourCost', totalLabourCost.toFixed(2));
        this.updateElement('finalLabourSubtotal', totalLabourCost.toFixed(2));
        
        this.calculateTotals();
    }

    calculateItemsSubtotal() {
        const subtotal = this.calculateTableSubtotal('itemsTable');
        this.updateElement('itemsSubtotal', subtotal.toFixed(2));
        this.updateElement('finalItemsSubtotal', subtotal.toFixed(2));
    }

    calculateProvisionalsSubtotal() {
        const subtotal = this.calculateTableSubtotal('provisionalsTable');
        this.updateElement('provisionalsSubtotal', subtotal.toFixed(2));
        this.updateElement('finalProvisionalsSubtotal', subtotal.toFixed(2));
    }

    calculateOptionalSubtotal() {
        const subtotal = this.calculateTableSubtotal('optionalTable');
        this.updateElement('optionalSubtotal', subtotal.toFixed(2));
        this.updateElement('finalOptionalSubtotal', subtotal.toFixed(2));
    }

    calculateTableSubtotal(tableId) {
        const table = document.getElementById(tableId);
        const rows = table.querySelectorAll('tbody tr');
        let subtotal = 0;
        
        rows.forEach(row => {
            const total = parseFloat(row.cells[5].querySelector('input').value) || 0;
            subtotal += total;
        });
        
        return subtotal;
    }

    calculateTotals() {
        const itemsSubtotal = parseFloat(document.getElementById('itemsSubtotal').textContent) || 0;
        const labourSubtotal = parseFloat(document.getElementById('labourSubtotal').textContent) || 0;
        const provisionalsSubtotal = parseFloat(document.getElementById('provisionalsSubtotal').textContent) || 0;
        
        const subtotalExcGST = itemsSubtotal + labourSubtotal + provisionalsSubtotal;
        const gstAmount = subtotalExcGST * 0.1;
        const totalIncGST = subtotalExcGST + gstAmount;
        
        this.updateElement('subtotalExcGST', subtotalExcGST.toFixed(2));
        this.updateElement('gstAmount', gstAmount.toFixed(2));
        this.updateElement('totalIncGST', totalIncGST.toFixed(2));
    }

    calculateAllTotals() {
        this.calculateItemsSubtotal();
        this.calculateLabourTotals();
        this.calculateProvisionalsSubtotal();
        this.calculateOptionalSubtotal();
        this.calculateTotals();
    }

    // Utility Functions
    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    autoExpand(field) {
        field.style.height = 'inherit';
        const computed = window.getComputedStyle(field);
        const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                     + parseInt(computed.getPropertyValue('padding-top'), 10)
                     + field.scrollHeight
                     + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                     + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
        field.style.height = Math.max(height, 20) + 'px';
    }

    // File Management
    generateFileName() {
        const jobName = document.getElementById('jobName').value.trim();
        const dueDate = document.getElementById('quoteDueDate').value;
        
        let fileName = '';
        
        if (jobName) {
            const cleanJobName = jobName.replace(/[<>:"/\\|?*]/g, '-');
            fileName += cleanJobName;
        } else {
            fileName += 'Scope_';
        }
        
        if (dueDate) {
            const dateObj = new Date(dueDate);
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();
            fileName += `_${day}-${month}-${year}`;
        } else {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            fileName += `_${day}-${month}-${year}`;
        }
        
        return fileName;
    }

    updatePageTitle() {
        const fileName = this.generateFileName();
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            pageTitle.textContent = fileName;
        }
        document.title = fileName;
    }

    // Data Management
    getTableData(tableId) {
        const table = document.getElementById(tableId);
        const rows = table.querySelectorAll('tbody tr');
        const data = [];
        
        rows.forEach(row => {
            const rowData = [];
            const cells = row.querySelectorAll('td');
            
            cells.forEach(cell => {
                const input = cell.querySelector('input[type="text"], input[type="number"]');
                const checkbox = cell.querySelector('input[type="checkbox"]');
                const textarea = cell.querySelector('textarea');
                
                if (checkbox) {
                    rowData.push(checkbox.checked);
                } else if (input) {
                    rowData.push(input.value);
                } else if (textarea) {
                    rowData.push(textarea.value);
                } else {
                    rowData.push('');
                }
            });
            data.push(rowData);
        });
        
        return data;
    }

    loadTableData(tableId, data) {
        const table = document.getElementById(tableId);
        const tbody = table.querySelector('tbody');
        
        // Clear existing rows except the first one
        while (tbody.rows.length > 1) {
            tbody.deleteRow(1);
        }
        
        // Load data into rows
        data.forEach((rowData, index) => {
            let row;
            if (index === 0) {
                row = tbody.rows[0];
            } else {
                // Add new row based on table type
                if (tableId === 'itemsTable') this.addItemRow();
                else if (tableId === 'labourTable') this.addLabourRow();
                else if (tableId === 'provisionalsTable') this.addProvisionalsRow();
                else if (tableId === 'optionalTable') this.addOptionalRow();
                row = tbody.rows[tbody.rows.length - 1];
            }
            
            const cells = row.querySelectorAll('td');
            rowData.forEach((value, cellIndex) => {
                if (cellIndex < cells.length) {
                    const input = cells[cellIndex].querySelector('input[type="text"], input[type="number"]');
                    const checkbox = cells[cellIndex].querySelector('input[type="checkbox"]');
                    const textarea = cells[cellIndex].querySelector('textarea');
                    
                    if (checkbox) {
                        checkbox.checked = value;
                    } else if (input) {
                        input.value = value;
                    } else if (textarea) {
                        textarea.value = value;
                        this.autoExpand(textarea);
                    }
                }
            });
        });
    }

    saveQuoteToFile() {
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
            items: this.getTableData('itemsTable'),
            labour: this.getTableData('labourTable'),
            provisionals: this.getTableData('provisionalsTable'),
            optional: this.getTableData('optionalTable')
        };

        const jsonData = JSON.stringify(quoteData, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        return { blob, url, data: quoteData };
    }

    saveQuote() {
        try {
            const { url } = this.saveQuoteToFile();
            
            const a = document.createElement('a');
            a.href = url;
            a.download = this.generateFileName() + '.json';
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

    loadQuote(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const quoteData = JSON.parse(e.target.result);
                
                // Load basic fields
                const fieldMappings = {
                    'jobName': 'jobName',
                    'contactPerson': 'contactPerson',
                    'phone': 'phone',
                    'email': 'email',
                    'quoteDueDate': 'quoteDueDate',
                    'businessName': 'businessName',
                    'scopeOfWork': 'scopeOfWork',
                    'normalRate': 'normalRate',
                    'overtimeRate': 'overtimeRate',
                    'pricesDiscussed': 'pricesDiscussed',
                    'additionalNotes': 'additionalNotes'
                };

                Object.keys(fieldMappings).forEach(fieldId => {
                    const element = document.getElementById(fieldId);
                    const value = quoteData[fieldMappings[fieldId]];
                    if (element && value !== undefined) {
                        element.value = value;
                    }
                });

                // Load business address
                if (quoteData.businessAddress) {
                    const businessFields = {
                        'businessStreet': 'street',
                        'businessSuburb': 'suburb',
                        'businessState': 'state',
                        'businessPostcode': 'postcode',
                        'businessCountry': 'country'
                    };

                    Object.keys(businessFields).forEach(fieldId => {
                        const element = document.getElementById(fieldId);
                        const value = quoteData.businessAddress[businessFields[fieldId]];
                        if (element && value !== undefined) {
                            element.value = value;
                        }
                    });
                }
                
                // Load site address
                if (quoteData.siteAddress) {
                    const siteFields = {
                        'siteStreet': 'street',
                        'siteSuburb': 'suburb',
                        'siteState': 'state',
                        'sitePostcode': 'postcode',
                        'siteCountry': 'country'
                    };

                    Object.keys(siteFields).forEach(fieldId => {
                        const element = document.getElementById(fieldId);
                        const value = quoteData.siteAddress[siteFields[fieldId]];
                        if (element && value !== undefined) {
                            element.value = value;
                        }
                    });
                }
                
                // Load table data
                if (quoteData.items) this.loadTableData('itemsTable', quoteData.items);
                if (quoteData.labour) this.loadTableData('labourTable', quoteData.labour);
                if (quoteData.provisionals) this.loadTableData('provisionalsTable', quoteData.provisionals);
                if (quoteData.optional) this.loadTableData('optionalTable', quoteData.optional);
                
                // Recalculate totals
                this.calculateAllTotals();
                
                alert('Quote loaded successfully!');
            } catch (error) {
                alert('Error loading quote file. Please check the file format.');
                console.error('Error parsing quote file:', error);
            }
        };
        reader.readAsText(file);
    }

    // Print Functions
    preprocessTextAreasForPrint() {
        const textareas = document.querySelectorAll('textarea, .notes-area, .expanding-field');
        
        textareas.forEach(textarea => {
            if (!textarea.value.trim()) {
                textarea.style.height = '80px';
                textarea.style.minHeight = '80px';
                return;
            }
            
            textarea.style.height = 'auto';
            textarea.style.minHeight = 'auto';
            
            const scrollHeight = textarea.scrollHeight;
            const padding = 24;
            const border = 2;
            const requiredHeight = scrollHeight + padding + border;
            
            textarea.style.height = Math.max(requiredHeight, 80) + 'px';
            textarea.style.minHeight = Math.max(requiredHeight, 80) + 'px';
            textarea.style.maxHeight = 'none';
            textarea.style.overflow = 'visible';
            textarea.style.resize = 'none';
            
            const section = textarea.closest('.section');
            if (section && requiredHeight > 300) {
                section.style.pageBreakBefore = 'always';
                section.classList.add('textarea-page-break');
            }
        });
    }

    cleanupAfterPrint() {
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

    printQuote() {
        this.updatePageTitle();
        this.preprocessTextAreasForPrint();
        
        setTimeout(() => {
            try {
                const { url } = this.saveQuoteToFile();
                
                const a = document.createElement('a');
                a.href = url;
                a.download = this.generateFileName() + '.json';
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                console.log('Auto-save completed before printing');
            } catch (error) {
                console.error('Auto-save failed:', error);
            }
            
            setTimeout(() => {
                window.print();
                
                setTimeout(() => {
                    this.cleanupAfterPrint();
                }, 1000);
            }, 100);
        }, 100);
    }
}

// Initialize the application
let quoteManager;

// Global functions for backward compatibility
function addItemRow() {
    quoteManager.addItemRow();
}

function addLabourRow() {
    quoteManager.addLabourRow();
}

function addProvisionalsRow() {
    quoteManager.addProvisionalsRow();
}

function addOptionalRow() {
    quoteManager.addOptionalRow();
}

function saveQuote() {
    quoteManager.saveQuote();
}

function loadQuote(event) {
    quoteManager.loadQuote(event);
}

function printQuote() {
    quoteManager.printQuote();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    quoteManager = new QuoteManager();
});

// Load from JSON file if provided
window.addEventListener('load', () => {
    // Check if there's JSON data to load from the uploaded file
    const jsonData = `{
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
  "scopeOfWork": "Doing stuff to fix things\\n- 5 things\\n- some work on weekend\\n- things are broken\\n- went there and fix things already\\n- found faults",
  "normalRate": 75,
  "overtimeRate": 220,
  "pricesDiscussed": "haven't spoken to client about costs, ",
  "additionalNotes": "here's some extra notes to tie it all together and what is to be concentrated on once tender/quote done",
  "items": [
    [
      "vsd 3ph 5kW",
      "7",
      "600",
      false,
      false,
      "4200.00"
    ],
    [
      "SWB - 400A",
      "1",
      "90000",
      true,
      false,
      "90000.00"
    ],
    [
      "new equipment type 1",
      "4",
      "700",
      false,
      false,
      "2800.00"
    ]
  ],
  "labour": [
    [
      "sparky",
      "10",
      false,
      ""
    ],
    [
      "pm",
      "5",
      false,
      ""
    ],
    [
      "sparky x 2",
      "20",
      true,
      "2 guys for 10 hours doing out of hours work"
    ]
  ],
  "provisionals": [
    [
      "back-up generator - 7kVA",
      "1",
      "3000",
      false,
      false,
      "3000.00"
    ],
    [
      "extra guy for Geni works",
      "1",
      "175",
      false,
      false,
      "175.00"
    ]
  ],
  "optional": [
    [
      "larger SWB - 450A",
      "1",
      "120000",
      false,
      false,
      "120000.00"
    ],
    [
      "extra DSB",
      "1",
      "30000",
      false,
      false,
      "30000.00"
    ]
  ]
}`;

    // Auto-load the sample data
    setTimeout(() => {
        if (quoteManager) {
            try {
                const sampleData = JSON.parse(jsonData);
                const event = { target: { result: jsonData } };
                
                // Simulate file load
                const reader = { onload: null };
                reader.onload = (e) => quoteManager.loadQuote({ target: { files: [{}] } });
                
                // Load the data directly
                quoteManager.loadQuote = (e) => {
                    const quoteData = sampleData;
                    
                    // Load basic fields
                    const fieldMappings = {
                        'jobName': 'jobName',
                        'contactPerson': 'contactPerson',
                        'phone': 'phone',
                        'email': 'email',
                        'quoteDueDate': 'quoteDueDate',
                        'businessName': 'businessName',
                        'scopeOfWork': 'scopeOfWork',
                        'normalRate': 'normalRate',
                        'overtimeRate': 'overtimeRate',
                        'pricesDiscussed': 'pricesDiscussed',
                        'additionalNotes': 'additionalNotes'
                    };

                    Object.keys(fieldMappings).forEach(fieldId => {
                        const element = document.getElementById(fieldId);
                        const value = quoteData[fieldMappings[fieldId]];
                        if (element && value !== undefined) {
                            element.value = value;
                        }
                    });

                    // Load addresses
                    if (quoteData.businessAddress) {
                        const businessFields = {
                            'businessStreet': 'street',
                            'businessSuburb': 'suburb',
                            'businessState': 'state',
                            'businessPostcode': 'postcode',
                            'businessCountry': 'country'
                        };

                        Object.keys(businessFields).forEach(fieldId => {
                            const element = document.getElementById(fieldId);
                            const value = quoteData.businessAddress[businessFields[fieldId]];
                            if (element && value !== undefined) {
                                element.value = value;
                            }
                        });
                    }
                    
                    if (quoteData.siteAddress) {
                        const siteFields = {
                            'siteStreet': 'street',
                            'siteSuburb': 'suburb',
                            'siteState': 'state',
                            'sitePostcode': 'postcode',
                            'siteCountry': 'country'
                        };

                        Object.keys(siteFields).forEach(fieldId => {
                            const element = document.getElementById(fieldId);
                            const value = quoteData.siteAddress[siteFields[fieldId]];
                            if (element && value !== undefined) {
                                element.value = value;
                            }
                        });
                    }
                    
                    // Load table data
                    if (quoteData.items) quoteManager.loadTableData('itemsTable', quoteData.items);
                    if (quoteData.labour) quoteManager.loadTableData('labourTable', quoteData.labour);
                    if (quoteData.provisionals) quoteManager.loadTableData('provisionalsTable', quoteData.provisionals);
                    if (quoteData.optional) quoteManager.loadTableData('optionalTable', quoteData.optional);
                    
                    // Recalculate totals
                    quoteManager.calculateAllTotals();
                };
                
                // Trigger the load
                quoteManager.loadQuote(event);
                console.log('Sample data loaded successfully');
            } catch (error) {
                console.error('Error loading sample data:', error);
            }
        }
    }, 500);
});