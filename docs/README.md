# EUC Asset Tracker - Western Australia

A comprehensive inventory management system designed for tracking End User Computing (EUC) assets across multiple locations in Western Australia and Darwin.

<img src="asset-tracker-demo.gif" alt="App Demo" width="800"/>

## Overview

The EUC Asset Tracker is a Python-based desktop application that provides real-time inventory management capabilities for IT assets. The application features a modern GUI built with CustomTkinter and includes advanced asset tracking with Serial Asset Number (SAN) management for high-value items.

## Key Features

- **Multi-Location Inventory Management**: Track assets across 5 locations
- **SAN Tracking**: Dedicated tracking for serialized assets (G8, G9, G10 generations)
- **Real-Time Logging**: Complete audit trail of all inventory changes
- **Visualization Tools**: Generate inventory reports and plots
- **Threshold Monitoring**: Automatic low-stock alerts
- **Asset Return Management**: Track asset returns with detailed logging
- **Excel Integration**: Seamless data storage and manipulation

## Supported Locations

1. **Basement 4.2** - Primary inventory location
2. **Build Room** - Secondary inventory location  
3. **Darwin** - Remote location inventory
4. **Level 17** - Additional storage location
5. **Basement 4.3** - Extended storage facility

## System Requirements

- Python 3.8 or higher
- Windows 10/11 (primary support)
- Excel 2016 or higher for data file compatibility
- Minimum 4GB RAM
- 100MB available disk space

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd asset-tracker
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python euc_stock_wa.v1.2.3.py
   ```

4. **Select your Excel data file** when prompted

## Documentation Structure

- [Installation Guide](installation.md) - Detailed setup instructions
- [User Guide](user-guide.md) - Complete application usage
- [Technical Documentation](technical-docs.md) - Architecture and code reference
- [API Reference](api-reference.md) - Function and class documentation
- [Troubleshooting](troubleshooting.md) - Common issues and solutions

## Architecture

The application follows a modular architecture with clear separation of concerns:

- **GUI Layer**: CustomTkinter-based user interface
- **Business Logic**: Inventory management and SAN tracking
- **Data Layer**: Excel workbook integration with openpyxl
- **Visualization**: Matplotlib-based reporting and charts
- **Configuration**: Centralized configuration management


