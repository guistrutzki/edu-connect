# Plan Feature - React Native Brownfield Integration

The user will provide a feature description for the Cobnet React Native module. Your job is to:

1. Create a technical plan that concisely describes the feature the user wants to build.
2. Research the files and functions that need to be changed to implement the feature.
3. Consider both React Native (TypeScript) and native platform (iOS Swift/Android Kotlin) implementations.
4. Account for brownfield integration patterns and native module bridge communications.
5. Include specific and verbatim details from the user's prompt to ensure the plan is accurate.

---

## Technical Requirements

This is strictly a technical requirements document that should:

1. **Context & Integration**: Include a brief description and specify if the feature requires:
   - Pure React Native implementation
   - Native module bridge extensions (`src/modules/`)
   - Native platform code changes (iOS Swift in `ios/cobnet/` or Android Kotlin)
   - Brownfield integration considerations

2. **File & Function Mapping**: Point to all relevant files and functions that need changes:
   - React Native components (`src/components/`, `src/screens/`)
   - State management stores (`src/store/` using Zustand)
   - API services (`src/services/queries/`, `src/services/mutations/`)
   - Native modules (`src/modules/CobnetXXXModule.ts`)
   - Native platform implementations (`ios/cobnet/` Swift files, Android Kotlin)
   - Types definitions (`src/types/`, `src/@customTypes/`)

3. **Native Bridge Communication**: If native modules are involved, specify:
   - Event emitters and listeners setup
   - Data serialization between JS and native layers
   - Platform-specific implementations (iOS vs Android differences)

4. **Dependencies & Integration**: Consider:
   - Bundle generation impacts (`cobnet:build-android`, `cobnet:build-ios` scripts)
   - Native dependencies (Podspec, Gradle changes)
   - Feature toggle integration (`src/store/useFeatureToggle.ts`)
   - Analytics tracking (`src/services/analytics/`)

5. **Phased Implementation**: Break up work into logical phases only for **complex features**:
   - **Phase 1 - Foundation**: Types, native modules, and data layer
   - **Phase 2A - React Native**: UI components and state management  
   - **Phase 2B - Native Platform**: iOS/Android native implementations
   - **Phase 3 - Integration**: Bridge communication and testing

---

## Clarifications

If the user's requirements are unclear, especially after researching the relevant files, you may ask up to **5 clarifying questions** before writing the plan.  
Focus on:
- Native module requirements vs pure RN implementation
- Platform-specific behaviors (iOS vs Android)
- Integration with existing Cobnet checkout flow
- Analytics and feature toggle needs

---

## Writing Guidelines

- **Brownfield Context**: Always consider this is a library module integrated into host apps
- **Native Module Patterns**: Follow existing patterns in `CobnetCheckoutModule`, `CobnetAnalyticsModule`, etc.
- **Bundle Impact**: Consider how changes affect the generated bundles for iOS/Android
- **State Management**: Leverage existing Zustand stores and React Query patterns
- **Concise & Precise**: Make the plan tight without losing critical implementation details

---

## Output

Write the plan into an `<N>_PLAN.md` file with the next available feature number.
