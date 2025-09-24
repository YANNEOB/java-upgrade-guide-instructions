# GitHub Copilot Instructions for Java Upgrades

This repository contains comprehensive GitHub Copilot instruction sets for upgrading Java projects across multiple JDK versions, focusing on language features, API changes, and migration patterns.

## Upgrade Paths

### Java 11 → Java 17 (LTS to LTS)
- **47 JEPs** covering Records, Sealed Classes, Pattern Matching, Text Blocks, Switch Expressions
- **Files**: `copilot-instructions-java-11-to-17.md`, `.vscode-copilot-instructions-11-17.md`, `upgrade-checklist-11-17.md`
- **Major Features**: Records, Pattern Matching for instanceof, Switch Expressions, Sealed Classes, Text Blocks
- **Key Benefits**: Significant boilerplate reduction, improved type safety, better domain modeling

### Java 17 → Java 21 (LTS to LTS)
- **22 JEPs** covering Virtual Threads, Pattern Matching for switch, Record Patterns  
- **Files**: `copilot-instructions-java-17-to-21.md`, `.vscode-copilot-instructions-17-21.md`, `upgrade-checklist-17-21.md`
- **Major Features**: Virtual Threads, Pattern Matching for switch, Record Patterns, String Templates (Preview)
- **Key Benefits**: Massive concurrency improvements, enhanced pattern matching, simplified data extraction

### Java 21 → Java 25
- **39 JEPs** covering Flexible Constructor Bodies, Primitive Types in Patterns, Module Import Declarations
- **Files**: `copilot-instructions-java-21-to-25.md`, `.vscode-copilot-instructions.md`, `upgrade-checklist.md`
- **Major Features**: Flexible Constructor Bodies, Primitive Types in Patterns, Module Import Declarations, Stream Gatherers
- **Key Benefits**: Enhanced language expressiveness, improved modularity, advanced stream processing

## Files Overview

### 📋 Core Instructions
- **`copilot-instructions-java-21-to-25.md`** - Complete GitHub Copilot instructions covering all JEPs and upgrade scenarios
- **`.vscode-copilot-instructions.md`** - Concise VS Code integration file for immediate Copilot assistance

### ✅ Planning & Execution  
- **`upgrade-checklist.md`** - Step-by-step checklist for systematic Java 21 to 25 migration

### 📊 Source Data
- **`jep-documentation.json`** - Java 21→25 JEPs (39 JEPs: 455, 466, 467, 468, 469, 471, 472, 473, 474, 475, etc.)
- **`jep-documentation-17-21.json`** - Java 17→21 JEPs (22 JEPs: 441, 444, 440, 439, etc.)
- **`jep-documentation-11-17.json`** - Java 11→17 JEPs (47 JEPs: 395, 409, 394, 361, 378, etc.)
- **`simple-scraper.js`** - Primary scraper for Java 21→25
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

### With VS Code & GitHub Copilot

Choose the appropriate instruction file for your upgrade path:

#### Java 11 → 17
1. Copy `.vscode-copilot-instructions-11-17.md` to your project root
2. Ask Copilot questions like:
   - "Convert this data class to a record"
   - "Use pattern matching for this instanceof check"
   - "Replace this switch statement with a modern switch expression"

#### Java 17 → 21
1. Copy `.vscode-copilot-instructions-17-21.md` to your project root  
2. Ask Copilot questions like:
   - "Convert this ExecutorService to use Virtual Threads"
   - "Use pattern matching for switch with this enum"
   - "Destructure this record using record patterns"

#### Java 21 → 25
1. Copy `.vscode-copilot-instructions.md` to your project root
2. Ask Copilot questions like:
   - "How do I use primitive types in pattern matching?"
   - "Convert this JavaDoc to Markdown format"
   - "Replace this sun.misc.Unsafe usage with modern APIs"

### For Manual Migration

1. Review `copilot-instructions-java-21-to-25.md` for comprehensive guidance
2. Follow `upgrade-checklist.md` for systematic migration
3. Use the examples and patterns provided

## Prerequisites

- Java project on version 11, 17, or 21 ready for upgrade
- Build tools (Maven/Gradle) supporting target JDK version
- VS Code with GitHub Copilot extension (for AI assistance)

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

## Contributing

This project was generated by scraping OpenJDK JEP documentation. To update:

1. Run the scraper: `npm install && npm run scrape`
2. Update the instruction files based on new JEP information
3. Test with GitHub Copilot for effectiveness

## License

This project is provided as-is for educational and development purposes. JEP documentation is sourced from OpenJDK project under their respective licenses.

---

**Note**: Some features mentioned are preview features requiring `--enable-preview` flag. Use appropriate caution when adopting preview features in production systems.