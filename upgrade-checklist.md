# Java 21 to Java 25 Upgrade Checklist

## Pre-Upgrade Assessment

- [ ] Inventory usage of `sun.misc.Unsafe` in codebase and dependencies
- [ ] Identify JNI usage (direct or through libraries)
- [ ] Check for ASM library usage for bytecode manipulation
- [ ] Review HTML-heavy JavaDoc comments for Markdown conversion
- [ ] Assess current switch statements for pattern matching opportunities

## Build System Updates

### Maven Projects
- [ ] Update Java version to 25 in `pom.xml`
- [ ] Update parent POM or BOM to JDK 25 compatible versions
- [ ] Use <release>25</release> in Maven's compiler plugin

### Gradle Projects  
- [ ] Update `java.toolchain.languageVersion` to 25
- [ ] Update Gradle wrapper to compatible version

## Code Changes by JEP

### JEP 466/484: Class-File API
- [ ] Replace ASM dependencies with standard Class-File API
- [ ] Migrate `ClassReader`/`ClassWriter` to `ClassModel`/`ClassFile`
- [ ] Update bytecode manipulation logic
- [ ] Test class transformation functionality

### JEP 471: Unsafe Deprecation
- [ ] Replace `sun.misc.Unsafe` memory access with `VarHandle`
- [ ] Migrate off-heap operations to `MemorySegment` 
- [ ] Update third-party libraries using Unsafe
- [ ] Test memory access patterns thoroughly

### JEP 472: JNI Restrictions
- [ ] Add `--enable-native-access` for JNI applications
- [ ] Update module descriptors for native access
- [ ] Consider FFM API for new native integrations
- [ ] Document native dependencies

### JEP 473: Stream Gatherers
- [ ] Identify complex stream operations for gatherer conversion
- [ ] Replace stateful stream patterns with gatherers
- [ ] Use built-in gatherers from `java.util.stream.Gatherers`
- [ ] Benchmark performance improvements

## Runtime Configuration

### JVM Flags Review
- [ ] Add `--enable-native-access=ALL-UNNAMED` if using JNI

### Module System Updates
- [ ] Add native access declarations to module-info.java
- [ ] Update service provider configurations

## Testing Strategy

### Functional Testing
- [ ] Run full test suite with Java 25
- [ ] Validate JNI functionality with new warnings
- [ ] Test bytecode manipulation changes

### Integration Testing
- [ ] Test with updated dependencies
- [ ] Verify third-party library compatibility
- [ ] Test deployment pipeline changes
- [ ] Validate monitoring/observability tools

## Post-Upgrade Validation

## Rollback Plan

- [ ] Document rollback procedure
- [ ] Maintain separate branches for Java 21/25 if needed

## Timeline Recommendations

1. **Phase 1** (Weeks 1-2): Build system and basic compatibility
2. **Phase 2** (Weeks 3-4): Address deprecation warnings
3. **Phase 3** (Weeks 5-6): Adopt new language features selectively  
4. **Phase 4** (Weeks 7-8): Performance testing and optimization
5. **Phase 5** (Weeks 9-10): Production deployment and monitoring

## Risk Mitigation

- Test in staging environment first
- Monitor application metrics closely
- Have rollback plan ready
- Update gradually across environments