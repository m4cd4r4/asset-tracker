# Development Guide

## Project Overview

The EUC Asset Tracker is a Python-based desktop application designed for comprehensive inventory management of End User Computing assets across multiple locations. This guide provides information for developers working on the project.

## Development Environment Setup

### Prerequisites

- Python 3.8 or higher
- Git for version control
- Code editor (VS Code, PyCharm, etc.)
- Microsoft Excel for testing data files

### Development Installation

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd asset-tracker
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Install Development Dependencies**
   ```bash
   pip install pytest black flake8 mypy
   ```

## Code Organization

### File Structure

```
asset-tracker/
├── euc_stock_wa.v1.2.3.py          # Main application entry point
├── config.py                       # Configuration management
├── inventory-levels_*.py           # Plotting modules
├── requirements.txt                # Production dependencies
├── CHANGELOG.md                    # Version history
├── EUC_Perth_Assets.xlsx           # Sample/test data file
├── docs/                           # Documentation
│   ├── README.md                   # Project overview
│   ├── installation.md             # Installation instructions
│   ├── user-guide.md               # End-user documentation
│   ├── technical-docs.md           # Architecture documentation
│   ├── api-reference.md            # Function/class reference
│   └── troubleshooting.md          # Common issues and solutions
├── Plots/                          # Generated visualization output
└── __pycache__/                    # Python bytecode cache
```

### Module Dependencies

```
Main Application (euc_stock_wa.v1.2.3.py)
├── GUI Framework
│   ├── customtkinter (modern UI components)
│   └── tkinter (standard GUI widgets)
├── Data Processing
│   ├── openpyxl (Excel file manipulation)
│   └── pandas (data analysis - plotting modules only)
├── Visualization
│   └── matplotlib (chart generation)
└── Standard Library
    ├── logging (application logging)
    ├── datetime (timestamp handling)
    ├── subprocess (external script execution)
    └── pathlib (file path operations)

Plotting Modules (inventory-levels_*.py)
├── pandas (data processing)
├── matplotlib (chart generation)
├── argparse (command line interface)
└── config (workbook path reference)
```

## Coding Standards

### Style Guidelines

The project follows PEP 8 Python style guidelines with these specific conventions:

**Naming Conventions**
- Variables: `snake_case`
- Functions: `snake_case`
- Classes: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Files: `kebab-case` for scripts, `snake_case` for modules

**Code Organization**
- Maximum line length: 88 characters (Black formatter standard)
- Use type hints where possible
- Docstrings for all public functions and classes
- Clear separation between GUI code and business logic

**Example Function Documentation**
```python
def update_inventory_count(item: str, operation: str, quantity: int) -> bool:
    """
    Updates inventory count for a specific item.
    
    Args:
        item: The inventory item name
        operation: Either 'add' or 'subtract'
        quantity: Number of items to add or remove
        
    Returns:
        True if update was successful, False otherwise
        
    Raises:
        ValueError: If quantity is negative
        FileNotFoundError: If Excel workbook cannot be accessed
    """
```

### Error Handling

**Consistent Error Handling Pattern**
```python
try:
    # Primary operation
    result = perform_operation()
except SpecificException as e:
    # Handle known exceptions
    logging.error(f"Specific error: {e}")
    show_user_friendly_message()
except Exception as e:
    # Handle unexpected exceptions
    logging.error(f"Unexpected error: {e}", exc_info=True)
    show_generic_error_message()
finally:
    # Cleanup operations
    cleanup_resources()
```

### Testing Strategy

**Unit Testing Structure**
```python
# tests/test_inventory.py
import pytest
from unittest.mock import patch, MagicMock
from euc_stock_wa import update_count, is_san_unique

class TestInventoryManagement:
    def test_san_validation_unique(self):
        """Test SAN uniqueness validation with valid input."""
        assert is_san_unique("12345") == True
        
    def test_san_validation_duplicate(self):
        """Test SAN uniqueness validation with duplicate input."""
        # Mock existing SAN in system
        with patch('euc_stock_wa.all_sans_sheet') as mock_sheet:
            mock_sheet.iter_rows.return_value = [("SAN12345",)]
            assert is_san_unique("12345") == False
            
    @patch('euc_stock_wa.workbook')
    def test_inventory_update_add(self, mock_workbook):
        """Test inventory addition functionality."""
        # Test implementation
        pass
```

## Architecture Guidelines

### Separation of Concerns

**Presentation Layer**
- GUI components and user interaction
- Input validation and formatting
- Display updates and refresh logic

**Business Logic Layer**
- Inventory management rules
- SAN validation and tracking
- Threshold monitoring

**Data Access Layer**
- Excel file operations
- Configuration management
- File system interactions

### Design Patterns

**Observer Pattern for UI Updates**
```python
class InventoryObserver:
    def notify_inventory_change(self, item: str, new_count: int):
        """Called when inventory changes occur."""
        self.update_treeview()
        self.update_log_view()
        self.save_workbook()
```

**Factory Pattern for Plot Generation**
```python
class PlotFactory:
    @staticmethod
    def create_plot(plot_type: str, data_source: str) -> PlotGenerator:
        if plot_type == "location_specific":
            return LocationPlotGenerator(data_source)
        elif plot_type == "combined":
            return CombinedPlotGenerator(data_source)
        else:
            raise ValueError(f"Unknown plot type: {plot_type}")
```

## Development Workflow

### Feature Development

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/new-functionality
   ```

2. **Implement Changes**
   - Write code following style guidelines
   - Add unit tests for new functionality
   - Update documentation as needed

3. **Test Changes**
   ```bash
   # Run unit tests
   pytest tests/
   
   # Check code style
   black --check .
   flake8 .
   
   # Type checking
   mypy euc_stock_wa.v1.2.3.py
   ```

4. **Integration Testing**
   - Test with real Excel data
   - Verify GUI functionality
   - Test plot generation

5. **Documentation Updates**
   - Update API reference for new functions
   - Add user guide sections for new features
   - Update technical documentation

### Release Process

1. **Version Numbering**
   - Follow semantic versioning (MAJOR.MINOR.PATCH)
   - Update version in code and documentation

2. **Update Documentation**
   - Add changelog entry
   - Update installation guide if needed
   - Review all documentation for accuracy

3. **Testing**
   - Full regression testing
   - Test on clean environment
   - Verify all features work correctly

4. **Package Release**
   - Tag release in Git
   - Create distribution package
   - Update deployment documentation

## Debugging and Profiling

### Debug Configuration

**Enable Debug Logging**
```python
import logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('debug.log'),
        logging.StreamHandler()
    ]
)
```

**Performance Profiling**
```python
import cProfile
import pstats

def profile_function():
    pr = cProfile.Profile()
    pr.enable()
    
    # Function to profile
    result = your_function()
    
    pr.disable()
    stats = pstats.Stats(pr)
    stats.sort_stats('cumulative')
    stats.print_stats()
    
    return result
```

### Common Development Issues

**GUI Threading Issues**
- Use `root.after()` for GUI updates from background threads
- Avoid blocking operations in the main GUI thread

**Excel File Handling**
- Always use try-catch for file operations
- Check file locks before attempting to write
- Implement proper cleanup in finally blocks

**Memory Management**
- Close matplotlib figures explicitly: `plt.close('all')`
- Minimize large object lifetimes
- Use generators for large data processing

## Extension Points

### Adding New Locations

1. **Update Sheet Mappings**
   ```python
   sheets = {
       'new_location': ('NewLoc_Items', 'NewLoc_Timestamps'),
       # ... existing locations
   }
   ```

2. **Add Location Button**
   ```python
   buttons = [
       ("New Location", lambda: switch_sheets('new_location')),
       # ... existing buttons
   ]
   ```

3. **Create Plotting Script**
   - Copy existing plotting script template
   - Update sheet references and titles
   - Add to plotting menu

### Custom Reporting

**Report Interface**
```python
class ReportGenerator:
    def generate_report(self, report_type: str, parameters: dict) -> str:
        """Generate custom report and return file path."""
        pass
        
    def get_available_reports(self) -> list:
        """Return list of available report types."""
        pass
```

### Plugin Architecture

**Plugin Base Class**
```python
class AssetTrackerPlugin:
    def __init__(self, app_instance):
        self.app = app_instance
        
    def initialize(self):
        """Called when plugin is loaded."""
        pass
        
    def add_menu_items(self, menu_bar):
        """Add plugin-specific menu items."""
        pass
        
    def cleanup(self):
        """Called when plugin is unloaded."""
        pass
```

## Contributing Guidelines

### Code Review Checklist

- [ ] Code follows style guidelines (PEP 8)
- [ ] All functions have docstrings
- [ ] Unit tests are included for new functionality
- [ ] Error handling is appropriate and consistent
- [ ] No hardcoded values (use configuration)
- [ ] Documentation is updated
- [ ] Performance impact is considered
- [ ] Security implications are reviewed

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Documentation
- [ ] Code comments updated
- [ ] User documentation updated
- [ ] API documentation updated
```

---

*Development guide last updated: June 28, 2025*
