# Installation Guide

## Prerequisites

### System Requirements

- **Operating System**: Windows 10/11 (64-bit recommended)
- **Python**: Version 3.8 or higher
- **Memory**: Minimum 4GB RAM
- **Storage**: 100MB available disk space
- **Excel**: Microsoft Excel 2016 or higher for data file compatibility

### Required Python Packages

The application requires the following Python packages:

```
customtkinter>=5.0.0
tkinter (included with Python)
openpyxl>=3.1.0
pandas>=1.5.0
matplotlib>=3.6.0
logging (included with Python)
pathlib (included with Python)
datetime (included with Python)
subprocess (included with Python)
```

## Installation Steps

### 1. Python Installation

If Python is not installed on your system:

1. Download Python from [python.org](https://www.python.org/downloads/)
2. Select "Add Python to PATH" during installation
3. Verify installation by opening Command Prompt and running:
   ```bash
   python --version
   ```

### 2. Clone or Download the Application

**Option A: Using Git**
```bash
git clone <repository-url>
cd asset-tracker
```

**Option B: Download ZIP**
1. Download the ZIP file from the repository
2. Extract to desired location (e.g., `C:\Users\[YourName]\Documents\asset-tracker`)

### 3. Install Dependencies

Open Command Prompt or PowerShell in the application directory and run:

```bash
pip install customtkinter openpyxl pandas matplotlib
```

### 4. Prepare the Excel Data File

The application requires an Excel workbook with specific sheet structure:

#### Required Sheets:
- `All_SANs` - Master SAN tracking
- `4.2_Items` - Basement 4.2 inventory
- `4.2_Timestamps` - Basement 4.2 transaction log
- `BR_Items` - Build Room inventory
- `BR_Timestamps` - Build Room transaction log
- `Darwin_Items` - Darwin inventory
- `Darwin_Timestamps` - Darwin transaction log
- `L17_Items` - Level 17 inventory (optional)
- `L17_Timestamps` - Level 17 transaction log (optional)
- `B4.3_Items` - Basement 4.3 inventory (optional)
- `B4.3_Timestamps` - Basement 4.3 transaction log (optional)
- `SAN_Returns` - Asset return tracking

#### Sheet Structure:

**Items Sheets** (e.g., `4.2_Items`):
| Column A | Column B | Column C | Column D |
|----------|----------|----------|----------|
| Item | LastCount | NewCount | Threshold |

**Timestamp Sheets** (e.g., `4.2_Timestamps`):
| Column A | Column B | Column C | Column D |
|----------|----------|----------|----------|
| Timestamp | Item | Action | SAN Number |

**All_SANs Sheet**:
| Column A | Column B | Column C | Column D |
|----------|----------|----------|----------|
| SAN Number | Item | Timestamp | Location |

**SAN_Returns Sheet**:
| Column A | Column B | Column C | Column D | Column E | Column F |
|----------|----------|----------|----------|----------|----------|
| SAN | Gen | Returned By | Returned To | Notes | Timestamp |

### 5. Configure the Application

1. Place your Excel file in the application directory
2. Name it `EUC_Perth_Assets.xlsx` or be prepared to select it when the application starts

### 6. First Run

1. Double-click `euc_stock_wa.v1.2.3.py` or run from command line:
   ```bash
   python euc_stock_wa.v1.2.3.py
   ```

2. When prompted, select your Excel data file using the file dialog

3. The application will create a `config.py` file to remember your file location

## Directory Structure

After installation, your directory should look like this:

```
asset-tracker/
├── euc_stock_wa.v1.2.3.py          # Main application
├── config.py                       # Auto-generated configuration
├── inventory-levels_4.2v3.py       # Basement 4.2 plotting
├── inventory-levels_BRv2.3.py      # Build Room plotting
├── inventory-levels_darwin.v2.py   # Darwin plotting
├── inventory-levels_combinedv1.5.py # Combined plotting
├── EUC_Perth_Assets.xlsx           # Your data file
├── Plots/                          # Generated plot output
├── docs/                           # Documentation
└── __pycache__/                    # Python cache files
```

## Verification

To verify successful installation:

1. Launch the application
2. Select a location (e.g., "Basement 4.2")
3. Verify that inventory items are displayed
4. Test adding/subtracting inventory
5. Check that changes are logged in the bottom panel
6. Generate a test plot from the Options menu

## Troubleshooting Installation Issues

### Common Issues:

**1. Python not found**
- Solution: Reinstall Python with "Add to PATH" option selected

**2. Package installation fails**
- Solution: Try using `pip install --user [package-name]`
- Alternative: Use `python -m pip install [package-name]`

**3. CustomTkinter import error**
- Solution: Ensure you have the latest pip: `python -m pip install --upgrade pip`
- Then reinstall: `pip install customtkinter`

**4. Excel file errors**
- Solution: Ensure Excel file has all required sheets with correct names
- Check that sheet headers match the expected structure

**5. Permission errors**
- Solution: Run Command Prompt as Administrator
- Or install packages with `--user` flag

### Getting Help

If you encounter issues not covered here:

1. Check the [Troubleshooting Guide](troubleshooting.md)
2. Verify all prerequisites are met
3. Contact technical support with error details

## Next Steps

After successful installation:

1. Read the [User Guide](user-guide.md) for detailed usage instructions
2. Review the [Technical Documentation](technical-docs.md) for advanced features
3. Explore the plotting and reporting capabilities

---

*Installation guide last updated: June 28, 2025*
