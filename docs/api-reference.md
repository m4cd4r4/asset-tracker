# API Reference

## Core Application Functions

### Inventory Management

#### `update_count(operation)`

Updates inventory counts and handles SAN tracking for items.

**Parameters:**
- `operation` (str): Either 'add' or 'subtract'

**Behavior:**
- Validates user input from the entry field
- Handles SAN-required items (G8, G9, G10) with individual SAN entry
- Updates Excel workbook inventory counts
- Logs all transactions with timestamps
- Refreshes UI displays

**Example Usage:**
```python
# Called when user clicks + or - buttons
update_count('add')     # Adds inventory
update_count('subtract') # Removes inventory
```

#### `log_change(item, action, san_number="", timestamp_sheet=None, volume=1)`

Records inventory transactions in the appropriate timestamp sheet.

**Parameters:**
- `item` (str): Item name being modified
- `action` (str): Action performed ('add' or 'subtract')
- `san_number` (str, optional): SAN number for tracked items
- `timestamp_sheet` (Worksheet): Excel sheet for logging
- `volume` (int): Quantity changed (default: 1)

**Returns:**
- None

**Side Effects:**
- Appends row to timestamp sheet
- Saves workbook
- Updates log view
- Writes to application log file

#### `switch_sheets(sheet_type)`

Changes the active location and updates displays.

**Parameters:**
- `sheet_type` (str): Location identifier ('original', 'backup', 'Darwin', 'L17', 'B4.3')

**Global Variables Modified:**
- `current_sheets`: Tuple of (items_sheet, timestamps_sheet)

**Behavior:**
- Updates global sheet references
- Refreshes inventory treeview
- Refreshes transaction log view

### SAN Management

#### `is_san_unique(san_number)`

Validates that a SAN number is not already in the system.

**Parameters:**
- `san_number` (str): SAN number to validate

**Returns:**
- `bool`: True if SAN is unique, False if duplicate

**Implementation:**
```python
def is_san_unique(san_number):
    search_string = "SAN" + san_number if not san_number.startswith("SAN") else san_number
    unique = all(search_string != row[0] for row in all_sans_sheet.iter_rows(min_row=2, values_only=True))
    return unique
```

#### `show_san_input()`

Displays modal dialog for SAN number entry.

**Returns:**
- `str`: SAN number entered by user
- `None`: If user cancels input

**Features:**
- Numeric-only input validation
- 5-6 digit length requirement
- Enter key submission
- Automatic focus management

#### `update_all_sans_location()`

Updates location information in the All_SANs sheet based on timestamp sheet presence.

**Behavior:**
- Iterates through all SANs in All_SANs sheet
- Checks timestamp sheets for SAN presence
- Updates location column with appropriate codes
- Saves workbook after updates

### UI Management

#### `update_treeview()`

Refreshes the main inventory display with current data.

**Behavior:**
- Clears existing treeview contents
- Loads data from current items sheet
- Applies alternating row colors
- Handles null values gracefully

#### `update_log_view()`

Refreshes the transaction log display.

**Behavior:**
- Clears existing log entries
- Loads from current timestamp sheet
- Sorts by timestamp (newest first)
- Applies formatting for readability

#### `highlight_button(selected, buttons)`

Updates visual highlighting for location selection buttons.

**Parameters:**
- `selected` (Button): Currently selected button widget
- `buttons` (list): List of all button widgets

**Behavior:**
- Sets selected button font to bold
- Resets other buttons to normal font
- Updates global selected_button reference

### Configuration Management

#### `save_config(workbook_path)`

Persists workbook path to configuration file.

**Parameters:**
- `workbook_path` (str): Full path to Excel workbook

**Behavior:**
- Creates/overwrites config.py file
- Writes workbook path as raw string
- Enables automatic file loading on restart

#### `get_file_path()`

Prompts user to select Excel workbook file.

**Returns:**
- `str`: Selected file path

**Behavior:**
- Creates temporary Tkinter window for file dialog
- Filters for Excel files (.xlsx)
- Exits application if no file selected
- Destroys temporary window after selection

### Reporting Functions

#### `run_inventory_script(script_name, output_prefix, success_message)`

Generalized function for executing plotting scripts.

**Parameters:**
- `script_name` (str): Name of Python script to execute
- `output_prefix` (str): Prefix for output filename
- `success_message` (str): Message displayed on success

**Behavior:**
- Generates timestamp for unique filenames
- Creates output directory if needed
- Executes script with subprocess
- Displays success/error messages
- Handles script execution errors

#### `save_plots()`

Generates all inventory plots in a timestamped folder.

**Behavior:**
- Creates timestamped subfolder in Plots directory
- Executes all plotting scripts sequentially
- Uses headless matplotlib backend
- Opens output folder when complete
- Handles individual script failures gracefully

### Data Validation

#### `ensure_threshold_column()`

Ensures all inventory sheets have threshold columns.

**Behavior:**
- Checks each location's items sheet
- Adds 'Threshold' column if missing
- Sets default threshold value (10)
- Saves workbook after modifications

#### `check_restock_threshold(threshold=10)`

Identifies items below their restock thresholds.

**Parameters:**
- `threshold` (int): Default threshold value (optional)

**Behavior:**
- Iterates through all inventory sheets
- Compares current stock to item thresholds
- Displays results in popup window
- Shows sheet, item, current stock, and threshold

## Plotting Module Functions

### Base Plotting Functions

#### `generate_inventory_plot(sheet_name, title, output_path)`

Core plotting functionality shared across all visualization scripts.

**Parameters:**
- `sheet_name` (str): Name of Excel sheet to plot
- `title` (str): Chart title
- `output_path` (str): File path for saving plot

**Returns:**
- None

**Behavior:**
- Loads Excel data using pandas
- Handles NaN values in NewCount column
- Creates horizontal bar chart with matplotlib
- Adds quantity labels to bars
- Saves to specified output path
- Displays interactive plot window

### Location-Specific Plotting

#### `inventory-levels_4.2v3.py`

Generates Basement 4.2 inventory visualization.

**Command Line Usage:**
```bash
python inventory-levels_4.2v3.py --output path/to/output.png
```

**Features:**
- Loads from '4.2_Items' sheet
- Dynamic x-axis scaling
- Date-stamped title
- Error handling for missing files

#### `inventory-levels_BRv2.3.py`

Generates Build Room inventory visualization.

**Command Line Usage:**
```bash
python inventory-levels_BRv2.3.py --output path/to/output.png
```

**Features:**
- Loads from 'BR_Items' sheet
- Consistent styling with other plots
- Automatic directory creation

#### `inventory-levels_darwin.v2.py`

Generates Darwin inventory visualization.

**Command Line Usage:**
```bash
python inventory-levels_darwin.v2.py --output path/to/output.png
```

**Features:**
- Loads from 'Darwin_Items' sheet
- Simplified error handling
- Interactive display capability

#### `inventory-levels_combinedv1.5.py`

Generates aggregated inventory across all locations.

**Command Line Usage:**
```bash
python inventory-levels_combinedv1.5.py --output path/to/output.png
```

**Features:**
- Combines data from multiple sheets
- Groups items by name and sums quantities
- Uses config.py for workbook path
- Handles multiple location data sources

## Dialog Classes

### `SANInputDialog(tk.Toplevel)`

Modal dialog for SAN number input with validation.

#### Constructor

```python
def __init__(self, parent, title=None):
    super().__init__(parent)
    self.transient(parent)
    self.title(title)
    self.parent = parent
    self.result = None
```

**Parameters:**
- `parent` (Widget): Parent window
- `title` (str, optional): Dialog window title

#### Methods

##### `create_widgets()`

Creates and arranges dialog UI components.

**Components:**
- Entry field with numeric validation
- Submit button
- Cancel button
- Enter key binding

##### `focus_entry()`

Forces focus to the entry field.

**Usage:**
- Called after dialog creation
- Called after error messages
- Ensures user can immediately type

##### `on_submit()`

Validates input and closes dialog.

**Validation Rules:**
- Input must be numeric
- Length must be 5-6 characters
- Cannot be empty

**Behavior:**
- Sets `self.result` on valid input
- Shows error message on invalid input
- Maintains focus after errors

##### `on_cancel()`

Cancels dialog without saving input.

**Behavior:**
- Sets `self.result` to None
- Destroys dialog window

## Asset Return Management

### `view_san_returns_log()`

Displays the SAN return history in a treeview.

**Features:**
- Creates 'SAN_Returns' sheet if missing
- Shows columns: SAN, Gen, Returned By, Returned To, Notes, Timestamp
- Includes "Return Asset" button for new entries
- Right-click copy functionality

### `open_san_return_form_with_tree(returns_tree)`

Opens the SAN return form with modern CustomTkinter styling.

**Parameters:**
- `returns_tree` (Treeview): Reference to returns display for updates

**Form Fields:**
- SAN: Text input for asset number
- Gen: Dropdown with G5-G11 options
- Returned By: Text input for person returning
- Returned To: Text input for receiving person/department
- Notes: Optional text input
- Timestamp: Auto-filled, editable

### `submit_san_return(san, gen, returned_by, returned_to, notes, timestamp, form_window, returns_tree)`

Processes and saves SAN return data.

**Parameters:**
- `san` (str): Asset serial number
- `gen` (str): Generation (G5-G11)
- `returned_by` (str): Person returning the asset
- `returned_to` (str): Receiving person/department
- `notes` (str): Additional information
- `timestamp` (str): Return timestamp
- `form_window` (Window): Form window to close
- `returns_tree` (Treeview): Display to refresh

**Validation:**
- All fields except Notes are required
- Validates timestamp format
- Ensures SAN_Returns sheet exists

**Behavior:**
- Appends data to SAN_Returns sheet
- Saves workbook
- Refreshes treeview display
- Closes form window
- Shows success message

## Utility Functions

### `add_copy_option(tree)`

Adds right-click context menu with copy functionality to treeviews.

**Parameters:**
- `tree` (Treeview): Treeview widget to enhance

**Features:**
- Right-click detection
- Copies selected row as comma-separated values
- Updates system clipboard
- Works with all treeview widgets

### `open_folder_prompt(folder_path)`

Prompts user to open folder containing saved plots.

**Parameters:**
- `folder_path` (Path): Directory to open

**Features:**
- Cross-platform folder opening
- Windows: Uses `os.startfile()`
- macOS: Uses `open` command
- Linux: Uses `xdg-open` command

### `refresh_san_returns_log(returns_tree)`

Refreshes the SAN returns treeview with latest data.

**Parameters:**
- `returns_tree` (Treeview): Widget to refresh

**Behavior:**
- Clears existing tree contents
- Loads all rows from SAN_Returns sheet
- Maintains formatting and styling

## Global Variables

### Application State

```python
# Current active location sheets
current_sheets = ('4.2_Items', '4.2_Timestamps')

# Available location mappings
sheets = {
    'original': ('4.2_Items', '4.2_Timestamps'),
    'backup': ('BR_Items', 'BR_Timestamps'),
    'L17': ('L17_Items', 'L17_Timestamps'),
    'B4.3': ('B4.3_Items', 'B4.3_Timestamps'),
    'Darwin': ('Darwin_Items', 'Darwin_Timestamps')
}

# Excel workbook objects
workbook = None
all_sans_sheet = None
workbook_path = None

# UI components
root = None
tree = None
log_view = None
entry_value = None
```

### Validation Commands

```python
# Numeric input validation for entry fields
vcmd = (root.register(lambda P: P.isdigit() or P == ""), '%P')
```

## Error Handling Patterns

### File Operations

```python
try:
    workbook = load_workbook(workbook_path)
except FileNotFoundError:
    tk.messagebox.showerror("Error", "Excel file not found")
    raise SystemExit
except PermissionError:
    tk.messagebox.showerror("Error", "Cannot access file")
except Exception as e:
    logging.error(f"Unexpected error: {e}")
    tk.messagebox.showerror("Error", f"Failed to load data: {e}")
```

### Subprocess Execution

```python
try:
    subprocess.run(
        ["python", script_path, "--output", output_path],
        check=True,
        env={**os.environ, "MPLBACKEND": "Agg"}
    )
except subprocess.CalledProcessError as e:
    logging.error(f"Script execution failed: {e}")
    tk.messagebox.showerror("Error", f"Failed to run script: {e}")
```

### Data Validation

```python
if not san_input or len(san_input) < 5 or len(san_input) > 6:
    tk.messagebox.showerror("Error", "Please enter a valid SAN number.")
    return False
```

## Configuration Schema

### Config File Structure

```python
# config.py - Auto-generated configuration
workbook_path = r'C:/path/to/workbook.xlsx'
```

### Excel Sheet Requirements

**Items Sheets:**
- Column A: Item (string)
- Column B: LastCount (integer)
- Column C: NewCount (integer)
- Column D: Threshold (integer)

**Timestamp Sheets:**
- Column A: Timestamp (datetime string)
- Column B: Item (string)
- Column C: Action (string)
- Column D: SAN Number (string)

**All_SANs Sheet:**
- Column A: SAN Number (string)
- Column B: Item (string)
- Column C: Timestamp (datetime string)
- Column D: Location (string)

**SAN_Returns Sheet:**
- Column A: SAN (string)
- Column B: Gen (string)
- Column C: Returned By (string)
- Column D: Returned To (string)
- Column E: Notes (string)
- Column F: Timestamp (datetime string)

## Event Handling

### Key Bindings

```python
# Entry field submission
entry.bind("<Return>", lambda _: update_count('add'))

# SAN input dialog submission
self.entry.bind("<Return>", lambda _: self.on_submit())

# Right-click context menus
tree.bind("<Button-3>", show_context_menu)
```

### Button Commands

```python
# Location selection with highlighting
btn.configure(
    command=lambda b=btn, cmd=command: [
        highlight_button(b, button_widgets), 
        root.after(1, cmd)
    ]
)

# Inventory modification
button_add.configure(command=lambda: update_count('add'))
button_subtract.configure(command=lambda: update_count('subtract'))
```

---

*API Reference last updated: June 28, 2025*
