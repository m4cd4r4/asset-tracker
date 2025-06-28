# User Guide

## Table of Contents

1. [Getting Started](#getting-started)
2. [Interface Overview](#interface-overview)
3. [Basic Operations](#basic-operations)
4. [SAN Management](#san-management)
5. [Location Management](#location-management)
6. [Reporting and Visualization](#reporting-and-visualization)
7. [Asset Return Management](#asset-return-management)
8. [Advanced Features](#advanced-features)

## Getting Started

### First Launch

1. **Start the Application**
   - Double-click `euc_stock_wa.v1.2.3.py`
   - Or run from command line: `python euc_stock_wa.v1.2.3.py`

2. **Select Data File**
   - Choose your Excel workbook when prompted
   - The application will remember this location for future sessions

3. **Choose Location**
   - Click one of the location buttons at the top
   - Start with "Basement 4.2" for your first session

## Interface Overview

### Main Window Layout

The application window is divided into several key areas:

```
┌─────────────────────────────────────────────────────────────┐
│                     Menu Bar (Options)                      │
├─────────────────────────────────────────────────────────────┤
│  [Basement 4.2] [Build Room] [Darwin] [Level 17] [B 4.3]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                 Inventory Items Table                       │
│  Item Name              | LastCount | NewCount              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                [-]  [Entry]  [+]                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                 Transaction Log                             │
│  Timestamp | Item | Action | SAN Number                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Menu System

**Options Menu**
- **SANs**
  - SANs In Stock: View all tracked SANs
  - Returned SANs - List: View return history
  - Returned SANs: Record asset returns
- **Inventory**
  - Location-specific inventory plots
  - Combined inventory view
  - Save all plots at once
- **Other Options**
  - Open Spreadsheet: Launch Excel file
  - Check Restock Threshold: Review low stock items

## Basic Operations

### Viewing Inventory

1. **Select Location**: Click a location button (highlighted in bold when selected)
2. **Review Items**: View current inventory in the main table
3. **Check Stock Levels**: Compare LastCount vs NewCount columns

### Adding Inventory

1. **Select Item**: Click on an item in the inventory table
2. **Enter Quantity**: Type the number of items to add in the entry field
3. **Add Items**: Click the "+" button or press Enter
4. **For SAN Items**: Enter individual SAN numbers when prompted

### Removing Inventory

1. **Select Item**: Click on an item in the inventory table
2. **Enter Quantity**: Type the number of items to remove
3. **Remove Items**: Click the "-" button
4. **For SAN Items**: Enter the specific SAN number to remove

### Understanding Item Types

**Regular Items**: Standard inventory items with quantity tracking
- Add/subtract by quantity
- No individual tracking required

**SAN Items** (G8, G9, G10): High-value items requiring individual tracking
- Each item has a unique SAN (Serial Asset Number)
- Must enter SAN for each add/remove operation
- Automatic duplicate checking

## SAN Management

### Adding SAN Items

1. Select a SAN-required item (contains G8, G9, or G10)
2. Enter quantity and click "+"
3. **SAN Input Dialog** appears:
   - Enter 5-6 digit SAN number
   - System validates uniqueness
   - Repeat for each item being added

### Removing SAN Items

1. Select the SAN item to remove
2. Enter quantity and click "-"
3. **SAN Input Dialog** appears:
   - Enter the specific SAN to remove
   - System verifies SAN exists and matches item type
   - Item is removed from active inventory

### Viewing SAN Inventory

**Access Options Menu > SANs > SANs In Stock**

Features:
- **Search Function**: Filter by SAN number
- **Location Display**: See where each SAN is located
- **Item Information**: View item type and timestamp
- **Right-click Copy**: Copy SAN details to clipboard

### SAN Return Management

**Recording Returns**:
1. Options Menu > SANs > Returned SANs
2. Fill out the return form:
   - **SAN**: Asset serial number
   - **Gen**: Generation (G5-G11)
   - **Returned By**: Person returning the asset
   - **Returned To**: Receiving person/department
   - **Notes**: Additional information
   - **Timestamp**: Auto-filled, can be modified

**Viewing Return History**:
- Options Menu > SANs > Returned SANs - List
- Shows complete return history
- Right-click to copy details

## Location Management

### Available Locations

1. **Basement 4.2**: Primary inventory location
2. **Build Room**: Secondary storage area
3. **Darwin**: Remote location inventory
4. **Level 17**: Additional storage (if configured)
5. **Basement 4.3**: Extended storage (if configured)

### Switching Locations

- Click any location button at the top of the window
- Selected location appears in bold
- Inventory and logs update automatically
- Each location maintains separate inventory and transaction history

### Location-Specific Features

Each location has:
- **Independent Inventory**: Separate item counts
- **Transaction Logging**: Complete audit trail
- **Threshold Monitoring**: Location-specific restock alerts
- **Visualization**: Individual location reports

## Reporting and Visualization

### Generating Individual Reports

**Options Menu > Inventory > [Location] Inventory**

Each location can generate:
- Horizontal bar chart showing current stock levels
- Date-stamped reports
- Automatically saved to Plots folder
- Interactive viewing capability

### Combined Reporting

**Options Menu > Inventory > Combined Inventory**

Features:
- Aggregates inventory across all locations
- Shows total quantities by item type
- Useful for organization-wide planning
- Exported as single comprehensive chart

### Batch Report Generation

**Options Menu > Inventory > Save Plots**

Functionality:
- Generates all location reports simultaneously
- Creates timestamped folder in Plots directory
- Includes all individual and combined reports
- Opens folder automatically when complete

### Report Features

All generated reports include:
- **Current Date**: Automatically timestamped
- **Quantity Labels**: Numbers displayed on each bar
- **Professional Formatting**: Consistent styling
- **High Resolution**: Suitable for presentations
- **PNG Format**: Universal compatibility

## Advanced Features

### Threshold Management

**Setting Item Thresholds**:
1. Each item can have a custom restock threshold
2. Default threshold is 10 units
3. Modifiable through Excel file or future interface updates

**Checking Low Stock**:
- Options Menu > Check Restock Threshold
- Displays items below their defined thresholds
- Shows current stock vs. required threshold
- Organized by location for easy action planning

### Data Export and Backup

**Excel Integration**:
- Options Menu > Open Spreadsheet
- Direct access to underlying data
- Manual editing capabilities
- Automatic backup through Excel's built-in features

**Transaction Logging**:
- Every action is logged with timestamp
- Includes user actions, quantities, and SAN details
- Provides complete audit trail
- Sortable by date/time for analysis

### Search and Filter Capabilities

**SAN Search**:
- Real-time filtering in SAN inventory view
- Type to instantly filter results
- Case-insensitive search
- Searches across all SAN fields

**Right-Click Functionality**:
- Copy data from any table
- Available in inventory, logs, and SAN views
- Copies entire row as comma-separated values
- Useful for external reporting or analysis

### Keyboard Shortcuts

- **Enter**: Execute add operation (same as clicking "+")
- **Tab**: Navigate between interface elements
- **Right-click**: Context menu (copy functionality)
- **Escape**: Close dialog windows

## Best Practices

### Daily Operations

1. **Start with Location Selection**: Always verify correct location
2. **Review Before Action**: Check current counts before adding/removing
3. **SAN Accuracy**: Double-check SAN numbers for accuracy
4. **Regular Backups**: Save Excel file regularly

### SAN Management

1. **Unique SANs**: Never reuse SAN numbers
2. **Immediate Entry**: Enter SANs as items are processed
3. **Verification**: Confirm SAN matches physical asset
4. **Return Documentation**: Always complete return forms

### Reporting

1. **Regular Reports**: Generate weekly location reports
2. **Threshold Monitoring**: Check thresholds before ordering
3. **Combined Analysis**: Use combined reports for strategic planning
4. **Archive Reports**: Maintain historical report archive

## Troubleshooting Common Issues

### Application Won't Start
- Verify Python installation
- Check Excel file accessibility
- Review error messages for specific issues

### Cannot Add/Remove Items
- Ensure item is selected in table
- Verify entry field contains valid number
- Check Excel file isn't open in another application

### SAN Entry Issues
- Confirm SAN isn't already in system
- Verify SAN matches expected format (5-6 digits)
- Check item type supports SAN tracking

### Report Generation Fails
- Ensure Plots folder exists and is writable
- Verify matplotlib installation
- Check available disk space

---

