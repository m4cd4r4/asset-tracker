# Troubleshooting Guide

## Common Issues and Solutions

### Installation Problems

#### Python Not Found

**Problem**: `'python' is not recognized as an internal or external command`

**Solution**:
1. Reinstall Python from [python.org](https://www.python.org/downloads/)
2. During installation, ensure "Add Python to PATH" is checked
3. Restart Command Prompt after installation
4. Verify with: `python --version`

**Alternative Solution**:
- Try using `py` instead of `python` on Windows
- Use `python3` on macOS/Linux systems

#### Package Installation Failures

**Problem**: `pip install` commands fail with permission errors

**Solutions**:
1. **Run as Administrator**:
   ```bash
   # Right-click Command Prompt -> "Run as administrator"
   pip install customtkinter openpyxl pandas matplotlib
   ```

2. **User Installation**:
   ```bash
   pip install --user customtkinter openpyxl pandas matplotlib
   ```

3. **Upgrade pip first**:
   ```bash
   python -m pip install --upgrade pip
   pip install customtkinter openpyxl pandas matplotlib
   ```

#### CustomTkinter Import Error

**Problem**: `ModuleNotFoundError: No module named 'customtkinter'`

**Solutions**:
1. **Fresh Installation**:
   ```bash
   pip uninstall customtkinter
   pip install customtkinter
   ```

2. **Check Python Environment**:
   ```bash
   python -m pip list | findstr customtkinter
   ```

3. **Alternative Installation**:
   ```bash
   python -m pip install customtkinter
   ```

### Application Startup Issues

#### File Selection Dialog Doesn't Appear

**Problem**: Application starts but file dialog is hidden or not visible

**Solutions**:
1. **Check Taskbar**: Look for flashing application icon
2. **Alt+Tab**: Switch between open windows
3. **Restart Application**: Close and reopen the application
4. **Check Multiple Monitors**: Dialog may appear on secondary monitor

#### Excel File Not Found Error

**Problem**: "Excel file not found" error on startup

**Solutions**:
1. **Verify File Exists**:
   - Ensure `EUC_Perth_Assets.xlsx` exists in the application directory
   - Check file permissions (read/write access)

2. **File Path Issues**:
   - Avoid spaces in folder names if possible
   - Use short path names
   - Ensure file isn't opened in Excel

3. **Create New Workbook**:
   - If file is missing, create a new Excel file with required sheet structure
   - See [Installation Guide](installation.md) for sheet requirements

#### Config.py Permission Error

**Problem**: Cannot create or modify config.py file

**Solutions**:
1. **Check Directory Permissions**:
   - Ensure write access to application directory
   - Run application as administrator if needed

2. **Manual Config Creation**:
   ```python
   # Create config.py manually with content:
   workbook_path = r'C:\path\to\your\EUC_Perth_Assets.xlsx'
   ```

### Excel File Issues

#### Sheets Not Found Error

**Problem**: Application reports missing required sheets

**Required Sheets**:
- `All_SANs`
- `4.2_Items` and `4.2_Timestamps`
- `BR_Items` and `BR_Timestamps`
- `Darwin_Items` and `Darwin_Timestamps`
- `SAN_Returns`

**Solutions**:
1. **Manual Sheet Creation**:
   - Open Excel file
   - Create missing sheets with exact names (case-sensitive)
   - Add required column headers

2. **Copy from Template**:
   - Use existing working Excel file as template
   - Copy sheet structure to new workbook

3. **Let Application Create**:
   - Some sheets (like SAN_Returns) are auto-created
   - Try accessing the feature that creates the missing sheet

#### File Access Denied

**Problem**: "Permission denied" when trying to save changes

**Solutions**:
1. **Close Excel**:
   - Ensure Excel file is not open in Microsoft Excel
   - Check for hidden Excel processes in Task Manager

2. **File Permissions**:
   - Right-click file → Properties → Security
   - Ensure your user has "Full control"

3. **File Location**:
   - Move file to Documents folder
   - Avoid system-protected directories

#### Corrupted Data Error

**Problem**: Application reports data corruption or unexpected values

**Solutions**:
1. **Backup and Repair**:
   - Create backup of Excel file
   - Open in Excel and use "File → Info → Check for Issues"

2. **Re-create Sheets**:
   - Delete problematic sheet
   - Create new sheet with correct structure
   - Re-import data manually

### SAN Management Issues

#### Duplicate SAN Error

**Problem**: "Duplicate or already used SAN number" when SAN appears unique

**Causes and Solutions**:
1. **Hidden Characters**:
   - Check for leading/trailing spaces in Excel
   - Use Excel's TRIM function to clean data

2. **Case Sensitivity**:
   - Ensure consistent SAN formatting
   - Check for mixed case in SAN prefix

3. **Previous Entries**:
   - Search All_SANs sheet for the SAN number
   - Check if SAN was previously used and returned

#### SAN Not Found for Removal

**Problem**: Cannot remove SAN that should exist

**Solutions**:
1. **Check Location**:
   - Verify you're in the correct location
   - SAN might be in different location's inventory

2. **Check Item Type**:
   - Ensure SAN matches the selected item type
   - G8 SANs cannot be removed from G9 items

3. **Search All_SANs**:
   - Use Options → SANs → SANs In Stock
   - Search for the SAN number to verify existence

#### SAN Dialog Focus Issues

**Problem**: SAN input dialog doesn't receive keyboard focus

**Solutions**:
1. **Click in Entry Field**: Manually click the input field
2. **Alt+Tab**: Switch focus to the dialog window
3. **Restart Application**: Close and reopen if focus is persistently broken

### Inventory Management Issues

#### Items Not Updating

**Problem**: Inventory counts don't change after add/subtract operations

**Troubleshooting Steps**:
1. **Verify Selection**: Ensure an item is selected in the inventory table
2. **Check Entry Field**: Confirm a valid number is entered
3. **Excel File Status**: Ensure Excel file isn't read-only
4. **Application Restart**: Close and reopen the application

#### Negative Inventory Counts

**Problem**: Inventory shows negative numbers

**Explanation**: This shouldn't happen due to built-in protection

**Solutions**:
1. **Manual Correction**:
   - Open Excel file directly
   - Correct negative values to zero or appropriate amount

2. **Check Calculation Logic**:
   - Verify LastCount and NewCount columns
   - Ensure proper data types (numbers, not text)

#### Transaction Log Not Updating

**Problem**: Actions don't appear in the transaction log

**Solutions**:
1. **Refresh View**: Click different location and back
2. **Check Timestamp Sheet**: Verify the corresponding timestamp sheet exists
3. **Scroll Down**: New entries appear at the top (most recent first)

### Plotting and Reporting Issues

#### Plot Generation Fails

**Problem**: "Failed to run the script" error when generating plots

**Common Causes and Solutions**:

1. **Missing Dependencies**:
   ```bash
   pip install matplotlib pandas
   ```

2. **Insufficient Disk Space**:
   - Check available space in Plots directory
   - Clean up old plot files

3. **File Path Issues**:
   - Ensure Plots directory exists
   - Check for special characters in file paths

4. **Data Issues**:
   - Verify Excel sheets contain data
   - Check for corrupt data in NewCount columns

#### Empty or Blank Plots

**Problem**: Plot files are created but appear empty

**Solutions**:
1. **Check Data Range**:
   - Verify inventory items have non-zero counts
   - Ensure data is in correct columns

2. **Matplotlib Backend**:
   - Try different plotting methods
   - Check if GUI backend is available

#### Cannot Open Plots Folder

**Problem**: Plots folder doesn't open after generation

**Solutions**:
1. **Manual Navigation**:
   - Browse to application directory → Plots folder
   - Look for timestamped subfolders

2. **File Explorer Issues**:
   - Try Windows + E to open new File Explorer
   - Restart Windows Explorer process

### Performance Issues

#### Slow Application Startup

**Causes and Solutions**:
1. **Large Excel File**:
   - Archive old data to reduce file size
   - Split data across multiple workbooks

2. **Network Drive**:
   - Move Excel file to local drive
   - Check network connectivity

3. **Antivirus Scanning**:
   - Add application directory to antivirus exclusions
   - Temporarily disable real-time scanning

#### Slow Inventory Updates

**Problem**: Adding/removing items takes a long time

**Solutions**:
1. **Close Other Applications**: Free up system memory
2. **Reduce Excel File Size**: Archive old transaction logs
3. **Local File Storage**: Avoid network drives for data file

### UI and Display Issues

#### Window Too Small/Large

**Problem**: Application window doesn't fit screen properly

**Solutions**:
1. **Manual Resize**: Drag window borders to adjust size
2. **Display Settings**: Check Windows display scaling settings
3. **Code Modification**: Edit geometry settings in main script

#### Text Too Small/Large

**Problem**: Interface text is difficult to read

**Solutions**:
1. **Windows Display Settings**:
   - Right-click desktop → Display settings
   - Adjust text scaling

2. **Font Modification**:
   - Edit font size in application code
   - Look for `font=("Helvetica", 12)` entries

#### Buttons Not Responding

**Problem**: Location buttons or other controls don't work

**Solutions**:
1. **Click Precisely**: Ensure clicking within button boundaries
2. **Wait for Processing**: Allow current operations to complete
3. **Restart Application**: Close and reopen if unresponsive

### Network and File Sharing Issues

#### Network Drive Access

**Problem**: Excel file on network drive causes errors

**Solutions**:
1. **Map Network Drive**: Use consistent drive letter
2. **UNC Path Issues**: Avoid UNC paths (\\server\share)
3. **Local Copy**: Copy file to local drive for better performance

#### Multi-User Access

**Problem**: Multiple users trying to access same Excel file

**Limitations**: Current application doesn't support concurrent access

**Workarounds**:
1. **Designated User**: Assign one person as data entry operator
2. **Time Slots**: Schedule access times for different users
3. **File Copies**: Use separate copies and merge data manually

## Advanced Troubleshooting

### Debug Mode

To enable debug logging, modify the logging configuration:

```python
# In euc_stock_wa.v1.2.3.py, change:
logging.basicConfig(level=logging.DEBUG)
```

This will provide more detailed error information in the console.

### Manual Data Recovery

If the Excel file becomes corrupted:

1. **Create Backup**: Always backup before attempting recovery
2. **Export Data**: Copy data to new workbook sheet by sheet
3. **Rebuild Structure**: Create new file with proper sheet structure
4. **Import Data**: Copy data back to new file

### Log File Analysis

Check Python error logs:
- Look for `.log` files in application directory
- Check console output for error messages
- Save error messages for technical support

### Registry and System Issues

**Windows-Specific Issues**:
1. **Python PATH Issues**: Check system environment variables
2. **File Associations**: Verify .py files open with correct Python version
3. **User Permissions**: Ensure user has necessary file system permissions

## Getting Additional Help

### Information to Gather

When seeking help, collect:
1. **Error Messages**: Exact text of any error dialogs
2. **Python Version**: Output of `python --version`
3. **Package Versions**: Output of `pip list`
4. **Operating System**: Windows version and architecture
5. **File Information**: Excel file size and sheet count
6. **Steps to Reproduce**: Exact sequence that causes the issue

### Log Files to Include

- Application console output
- Windows Event Viewer errors (if any)
- Excel file recovery logs
- Python crash dumps

### Alternative Solutions

If issues persist:
1. **Clean Installation**: Uninstall and reinstall Python and packages
2. **Different Python Version**: Try Python 3.9 or 3.10
3. **Virtual Environment**: Create isolated Python environment
4. **Different Computer**: Test on alternative system

---

*Troubleshooting guide last updated: June 28, 2025*
