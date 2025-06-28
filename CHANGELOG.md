# Changelog

All notable changes to the EUC Asset Tracker project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.3] - 2024-11-19

### Added
- Enhanced SAN return management with generation tracking
- Modern CustomTkinter styling for return forms
- Dropdown selection for asset generations (G5-G11)
- Comprehensive logging for all inventory transactions
- Right-click copy functionality for all data tables
- Automatic folder opening after plot generation
- Location-specific threshold monitoring
- Dynamic SAN location tracking in All_SANs sheet

### Changed
- Improved SAN input dialog with better focus management
- Enhanced error handling for file operations
- Modernized UI with CustomTkinter components
- Optimized plot generation with timestamp-based file naming
- Refined button highlighting for location selection
- Updated transaction logging to include volume information

### Fixed
- SAN uniqueness validation across all locations
- Proper handling of negative inventory prevention
- Improved Excel file access and permission handling
- Fixed focus issues in SAN input dialogs
- Corrected data type handling in inventory calculations

## [2.3] - Previous Versions

### Build Room Inventory (BRv2.3)
- Dedicated Build Room inventory visualization
- Horizontal bar chart generation
- PNG output with timestamp
- Error handling for missing data files

### Darwin Inventory (v2.0)
- Darwin location inventory tracking
- Standalone plotting functionality
- Interactive plot display
- Command-line argument support

## [1.5] - Combined Inventory

### Added
- Multi-location inventory aggregation
- Combined plotting across all locations
- Data grouping and summation by item type
- Config.py integration for path management

### Features
- Basement 4.2, Build Room, and Darwin data consolidation
- Dynamic x-axis scaling based on data range
- Professional chart formatting with quantity labels
- Automatic directory creation for output

## [4.2v3] - Basement 4.2 Enhancement

### Added
- Basement 4.2 specific inventory management
- Enhanced error handling and validation
- Improved data processing pipeline
- Dynamic plot scaling and formatting

### Changed
- Updated sheet references for 4.2_Items
- Improved file path handling for frozen applications
- Enhanced plot title formatting with location specification

## [Previous Versions] - Historical Development

### Core Application Features
- Multi-location inventory management system
- SAN (Serial Asset Number) tracking for high-value items
- Excel workbook integration with openpyxl
- Real-time transaction logging
- Tkinter-based GUI interface
- Matplotlib visualization generation

### Supported Locations
- Basement 4.2 (Primary)
- Build Room (Secondary)
- Darwin (Remote)
- Level 17 (Optional)
- Basement 4.3 (Extended)

### Data Management
- Excel-based data storage
- Automatic sheet creation and management
- Transaction timestamp logging
- Asset return tracking
- Threshold-based restock alerts

---

## Version Numbering

### Current Versioning Strategy
- **Major.Minor.Patch** format
- Major: Significant architectural changes
- Minor: New features and functionality
- Patch: Bug fixes and minor improvements

### Historical Versions
- Location-specific versions (e.g., BRv2.3, v2.0)
- Feature-specific versions (e.g., 4.2v3)
- Combined functionality versions (e.g., combinedv1.5)

---

## Future Releases

### Planned Features (v2.0.0)
- Database migration from Excel to SQLite
- Multi-user support with user authentication
- Web-based interface option
- Enhanced reporting and analytics
- API development for external integrations
- Mobile application support

### Under Consideration
- Cloud storage integration
- Barcode scanning support
- Advanced inventory forecasting
- Integration with enterprise asset management systems
- Role-based access control
- Audit trail encryption

---

*For detailed technical information about each release, see the [Technical Documentation](docs/technical-docs.md).*

*Changelog last updated: June 28, 2025*
