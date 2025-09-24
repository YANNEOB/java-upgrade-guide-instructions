# GitHub Copilot Instructions for Java Upgrades

This repository contains comprehensive GitHub Copilot instruction sets for upgrading Java projects across multiple JDK versions, focusing on language features, API changes, and migration patterns.

**All content is based on official JEP (Java Enhancement Proposal) documentation scraped directly from OpenJDK.org**, ensuring accuracy and completeness for each upgrade path.

> 💡 **Also Available**: These Java upgrade instructions are featured in the [Awesome Copilot repository](https://github.com/github/awesome-copilot/blob/main/collections/java-development.md) - GitHub's curated collection of the best Copilot resources for developers.

## 🚀 Recommended: Try GitHub Copilot App Modernization Extension First

**Before using these manual instruction files, we strongly recommend trying the [GitHub Copilot App Modernization for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-upgrade) VS Code extension.** This extension provides:

### ✅ **Production-Ready Automation**
- **Guided Agent Mode**: Interactive, step-by-step upgrade process with human oversight
- **OpenRewrite Integration**: Battle-tested refactoring recipes used by thousands of projects
- **Automated Build Fixes**: Intelligent resolution of compilation errors and dependency conflicts
- **CVE Scanning**: Comprehensive security vulnerability detection and remediation

### ✅ **Comprehensive Workflow**
1. **Project Analysis**: Scans JDK version, build configuration, and deprecated APIs
2. **Custom Upgrade Plan**: Generates editable migration strategy tailored to your project
3. **Automated Transformation**: Applies code changes using proven OpenRewrite recipes
4. **Validation Loop**: Fixes build errors iteratively until compilation succeeds
5. **Test Execution**: Validates changes through your existing test suite
6. **Security Audit**: Identifies and suggests fixes for vulnerable dependencies

### ✅ **Beyond Runtime Upgrades**
- **Cloud Migration**: Assess and migrate to Azure with guided steps
- **Authentication Modernization**: Migrate from on-premises auth to Microsoft Entra ID
- **Deployment Automation**: One-click deployment to Azure with infrastructure provisioning

### 🔧 **Getting Started with the Extension**
```bash
# Install the extension in VS Code
# Search for "GitHub Copilot App Modernization" in the Extensions marketplace

# In VS Code, open Copilot Chat and select the Java upgrade tool
# Then paste: "Using Java upgrade tools, upgrade this project to Java 21. 
# Analyze deprecated APIs, update dependencies, and propose a safe migration plan."
```

**When to use these manual instructions instead:**
- The extension doesn't support your specific upgrade scenario
- You need detailed understanding of individual JEPs
- You prefer manual control over each transformation step
- You want to learn about Java language evolution in depth

---

## Upgrade Paths

### Java 11 → Java 17 (LTS to LTS)
- **47 JEPs** covering Records, Sealed Classes, Pattern Matching, Text Blocks, Switch Expressions
- **Instruction File**: `java-11-to-17.instructions.md`
- **Major Features**: Records, Pattern Matching for instanceof, Switch Expressions, Sealed Classes, Text Blocks
- **Key Benefits**: Significant boilerplate reduction, improved type safety, better domain modeling

### Java 17 → Java 21 (LTS to LTS)
- **22 JEPs** covering Virtual Threads, Pattern Matching for switch, Record Patterns  
- **Instruction File**: `java-17-to-21.instructions.md`
- **Major Features**: Virtual Threads, Pattern Matching for switch, Record Patterns, String Templates (Preview)
- **Key Benefits**: Massive concurrency improvements, enhanced pattern matching, simplified data extraction

### Java 21 → Java 25
- **39 JEPs** covering Flexible Constructor Bodies, Primitive Types in Patterns, Module Import Declarations
- **Instruction File**: `java-21-to-25.instructions.md`
- **Major Features**: Flexible Constructor Bodies, Primitive Types in Patterns, Module Import Declarations, Stream Gatherers
- **Key Benefits**: Enhanced language expressiveness, improved modularity, advanced stream processing

## Files Overview

### 📋 GitHub Copilot Instructions
Choose the appropriate instruction file for your upgrade path:
- **`java-11-to-17.instructions.md`** - Complete GitHub Copilot instructions for Java 11 → 17 upgrade (47 JEPs)
- **`java-17-to-21.instructions.md`** - Complete GitHub Copilot instructions for Java 17 → 21 upgrade (22 JEPs)
- **`java-21-to-25.instructions.md`** - Complete GitHub Copilot instructions for Java 21 → 25 upgrade (39 JEPs)

**Usage**: Copy your selected file to `.github/copilot-instructions.md` in your project root. The `.instructions.md` extension helps identify these as GitHub Copilot instruction files.

### 📊 Source Data (from OpenJDK.org)
- **`jep-documentation-21-25.json`** - Java 21→25 JEPs scraped from [OpenJDK JDK 25 JEPs](https://openjdk.org/projects/jdk/25/jeps-since-jdk-21) (39 JEPs: 455, 466, 467, 468, 469, 471, 472, 473, 474, 475, etc.)
- **`jep-documentation-17-21.json`** - Java 17→21 JEPs scraped from [OpenJDK JDK 21 JEPs](https://openjdk.org/projects/jdk/21/jeps-since-jdk-17) (22 JEPs: 441, 444, 440, 439, etc.)
- **`jep-documentation-11-17.json`** - Java 11→17 JEPs scraped from [OpenJDK JDK 17 JEPs](https://openjdk.org/projects/jdk/17/jeps-since-jdk-11) (47 JEPs: 395, 409, 394, 361, 378, etc.)
- **`scraper-21-25.js`** - Primary scraper for Java 21→25
- **`scraper-17-21.js`** - Scraper for Java 17→21
- **`scraper-11-17.js`** - Scraper for Java 11→17

## Key Features by Upgrade Path

### Java 11 → 17: Foundation of Modern Java

#### Language Features
- **Records** (JEP 395) - Immutable data classes with automatic methods
- **Sealed Classes** (JEP 409) - Restricted inheritance hierarchies
- **Pattern Matching for instanceof** (JEP 394) - Type-safe casting
- **Switch Expressions** (JEP 361) - Modern control flow with arrow syntax
- **Text Blocks** (JEP 378) - Multi-line string literals

#### Runtime Improvements
- **Helpful NullPointerExceptions** (JEP 358) - Better error messages
- **ZGC** (JEP 377) - Low-latency garbage collector
- **Shenandoah** (JEP 379) - Low-pause garbage collector
- **Enhanced Random Generators** (JEP 356) - Better random number generation

### Java 17 → 21: Concurrency Revolution

#### Language Features
- **Virtual Threads** (JEP 444) - Lightweight threads for massive concurrency
- **Pattern Matching for switch** (JEP 441) - Enhanced switch with patterns
- **Record Patterns** (JEP 440) - Destructuring records in patterns
- **String Templates** (JEP 430, Preview) - Safe string interpolation

#### API Enhancements
- **Sequenced Collections** (JEP 431) - First/last element access
- **UTF-8 by Default** (JEP 400) - Simplified charset handling
- **Scoped Values** (JEP 446, Preview) - Thread-local alternative

### Java 21 → 25: Language Expressiveness

#### Language Features
- **Primitive Types in Patterns** (JEP 455) - Pattern matching for primitives
- **Flexible Constructor Bodies** (JEP 482) - Statements before super()
- **Module Import Declarations** (JEP 476) - Simplified module imports
- **Stream Gatherers** (JEP 473) - Custom intermediate stream operations

### Language Features
- **Pattern Matching Enhancement** (JEP 455/488) - Primitive types in patterns, instanceof, and switch
- **Derived Record Creation** (JEP 468) - `with` expressions for records
- **Stream Gatherers** (JEP 473) - Custom intermediate stream operations

### API Changes
- **Class-File API** (JEP 466/484) - Standard replacement for ASM library
- **Markdown JavaDoc** (JEP 467) - Modern documentation syntax
- **Vector API** (JEP 469) - SIMD operations (8th incubator)

### Deprecations & Warnings
- **sun.misc.Unsafe** (JEP 471) - Memory access methods deprecated
- **JNI Restrictions** (JEP 472) - Warnings for native code usage

### Runtime Improvements  
- **ZGC Generational** (JEP 474) - Now default mode
- **G1 Optimization** (JEP 475) - Late barrier expansion

## How to Use

### 🥇 **Option 1: GitHub Copilot App Modernization Extension (Recommended)**

Use the [GitHub Copilot App Modernization for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-upgrade) extension for automated, production-ready upgrades with OpenRewrite integration and comprehensive validation.

### 🥈 **Option 2: Manual Instructions with GitHub Copilot**

If you prefer manual control or need to understand specific language changes in detail:

1. **Select Your Upgrade Path**: Choose the appropriate instruction file based on your current and target Java versions:
   - Java 11 → 17: Use `java-11-to-17.instructions.md`
   - Java 17 → 21: Use `java-17-to-21.instructions.md`
   - Java 21 → 25: Use `java-21-to-25.instructions.md`

2. **Install the Instructions**: Copy your selected instruction file to your project's `.github/` directory:
   ```bash
   # Create .github directory if it doesn't exist
   mkdir -p .github
   
   # Copy the appropriate instruction file
   cp java-21-to-25.instructions.md .github/copilot-instructions.md
   ```

3. **Start Using GitHub Copilot**: Ask Copilot upgrade-specific questions such as:

#### Java 11 → 17 Examples
   - "Convert this data class to a record"
   - "Use pattern matching for this instanceof check"
   - "Replace this switch statement with a modern switch expression"

#### Java 17 → 21 Examples
   - "Convert this ExecutorService to use Virtual Threads"
   - "Use pattern matching for switch with this enum"
   - "Destructure this record using record patterns"

#### Java 21 → 25 Examples
   - "How do I use primitive types in pattern matching?"
   - "Convert this JavaDoc to Markdown format"
   - "Replace this sun.misc.Unsafe usage with modern APIs"

### For Manual Migration

1. Review your selected instruction file for comprehensive guidance
2. Use the examples and patterns provided for manual code updates

## Prerequisites

- Java project on version 11, 17, or 21 ready for upgrade
- Build tools (Maven/Gradle) supporting target JDK version
- VS Code with GitHub Copilot extension (for AI assistance)
- `.github/` directory in your project root (for Copilot instructions)

## Migration Strategy

### General Approach
1. **Assessment** - Review current codebase for affected areas
2. **Build Updates** - Configure build system for target JDK
3. **Deprecation Fixes** - Address deprecated APIs and warnings
4. **Feature Adoption** - Selectively adopt new language features  
5. **Testing** - Comprehensive validation with new runtime
6. **Deployment** - Gradual rollout with monitoring

### Recommended Upgrade Sequence
For projects on Java 11: **Java 11 → 17 → 21 → 25**
- Each step provides substantial value independently
- LTS versions (11, 17, 21) offer stability milestones
- Incremental adoption reduces migration risk

## Data Sources

All JEP (Java Enhancement Proposal) information in this repository is sourced directly from official OpenJDK documentation:

### Java 11 → 17
- **Source**: [OpenJDK Projects JDK 17 - JEPs Since JDK 11](https://openjdk.org/projects/jdk/17/jeps-since-jdk-11)
- **Scraper**: `scraper-11-17.js`
- **Output**: `jep-documentation-11-17.json` (47 JEPs)

### Java 17 → 21  
- **Source**: [OpenJDK Projects JDK 21 - JEPs Since JDK 17](https://openjdk.org/projects/jdk/21/jeps-since-jdk-17)
- **Scraper**: `scraper-17-21.js`
- **Output**: `jep-documentation-17-21.json` (22 JEPs)

### Java 21 → 25
- **Source**: [OpenJDK Projects JDK 25 - JEPs Since JDK 21](https://openjdk.org/projects/jdk/25/jeps-since-jdk-21)
- **Scraper**: `simple-scraper.js` and `scraper-21-25.js`
- **Output**: `jep-documentation-21-25.json` (39 JEPs)

Each scraper extracts:
- JEP number and title
- Full JEP specification content
- Goals, motivation, and technical details
- Direct links to official OpenJDK JEP pages

## Contributing

This project was generated by scraping OpenJDK JEP documentation. To update:

1. Run the scraper: `npm install && npm run scrape`
2. Update the instruction files based on new JEP information
3. Test with GitHub Copilot for effectiveness

## License

This project is provided as-is for educational and development purposes. All JEP (Java Enhancement Proposal) content is sourced from the official OpenJDK project (https://openjdk.org) and individual JEP documents retain their original OpenJDK licensing terms.

**JEP Data Sources**:
- OpenJDK Project documentation at https://openjdk.org
- Individual JEP specifications under OpenJDK governance
- No modifications made to JEP content, only extraction and compilation

---

**Note**: Some features mentioned are preview features requiring `--enable-preview` flag. Use appropriate caution when adopting preview features in production systems.