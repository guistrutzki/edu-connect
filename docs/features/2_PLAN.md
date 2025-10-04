# Feature Plan - Home Screen Layout Redesign

## Context & Integration

This feature involves redesigning the home screen layout for the EduConnect app to match the website content and simplify the navigation structure. This is a **Pure React Native implementation** that focuses on UI/UX improvements and navigation restructuring.

### Current State Analysis
- App currently has 3 tabs: Home, Gravar (Audio Capture), Emojis
- Home screen has basic welcome message and logout functionality
- Audio capture screen exists but needs enhancement for 3-second interval processing
- Emoji display screen will be removed from navigation

### Target State
- **2 tabs only**: "Início" (Home) and "Gravar" (Audio Capture)
- Home screen with comprehensive content explaining the app's purpose
- Enhanced audio capture with real-time processing every 3 seconds
- Remove logout button and emoji display tab

## File & Function Mapping

### 1. React Native Components & Screens
**Files to modify:**
- `src/screens/Main/HomeScreen.tsx` - Complete redesign with new content structure
- `src/screens/Main/AudioCaptureScreen.tsx` - Enhance with 3-second interval processing
- `src/navigation/MainStackNavigator.tsx` - Update tab structure (remove EmojiDisplay tab)
- `src/navigation/types.ts` - Update route names and types

### 2. Content Structure for Home Screen
**New content to implement:**
```
EduConnect
Transforme o som em compreensão visual

Ajudamos pessoas com autismo, deficiência auditiva ou visual a compreenderem melhor o ambiente educacional através de representações visuais e textuais.

Sala de aula inclusiva com estudantes diversos
Captura de Áudio
Ouve e processa a fala em tempo real

Representação Visual
Converte texto em imagens e símbolos

Inclusão Total
Acessível para todos os tipos de necessidades

Iniciar Escuta
```

### 3. Navigation Updates
**Changes required:**
- Remove `EMOJI_DISPLAY` route from `ROUTES_NAME` enum
- Update `MainTabParamList` to only include `Home` and `AudioCapture`
- Change tab labels: "Home" → "Início", keep "Gravar"
- Remove EmojiDisplayScreen import and tab configuration

### 4. Audio Capture Enhancement
**New functionality:**
- Implement 3-second interval audio processing
- Send audio chunks to backend every 3 seconds
- Receive transcription, emoji, and summary for each chunk
- Update UI to show real-time processing status

## Implementation Details

### Phase 1 - Navigation Structure Update
1. **Update `src/navigation/types.ts`:**
   - Remove `EMOJI_DISPLAY` from `ROUTES_NAME` enum
   - Update `MainTabParamList` to only include `Home` and `AudioCapture`
   - Remove `EmojiDisplay: undefined` from type definition

2. **Update `src/navigation/MainStackNavigator.tsx`:**
   - Remove EmojiDisplayScreen import
   - Remove third tab configuration
   - Update tab labels: "Home" → "Início"
   - Keep "Gravar" tab as is

### Phase 2 - Home Screen Redesign
1. **Complete rewrite of `src/screens/Main/HomeScreen.tsx`:**
   - Remove logout button and functionality
   - Implement new content structure with:
     - App title: "EduConnect"
     - Subtitle: "Transforme o som em compreensão visual"
     - Description paragraph
     - Three feature cards with icons and descriptions
     - "Iniciar Escuta" call-to-action button
   - Use existing theme colors and typography system
   - Implement responsive design using existing utilities

2. **Content sections to implement:**
   - Header section with app branding
   - Main description section
   - Three feature cards:
     - "Sala de aula inclusiva com estudantes diversos" with classroom icon
     - "Captura de Áudio" with microphone icon
     - "Representação Visual" with visual representation icon
     - "Inclusão Total" with accessibility icon
   - Call-to-action section with "Iniciar Escuta" button

### Phase 3 - Audio Capture Enhancement
1. **Enhance `src/screens/Main/AudioCaptureScreen.tsx`:**
   - Implement 3-second interval timer for audio processing
   - Add real-time status indicators
   - Create backend integration structure (placeholder for now)
   - Update UI to show processing intervals
   - Add visual feedback for each 3-second chunk processing

2. **New functionality:**
   - Timer-based audio chunking (every 3 seconds)
   - Mock backend integration structure
   - Real-time processing status display
   - Audio chunk history display

## Dependencies & Integration

### Existing Dependencies (No new dependencies required)
- React Navigation (already installed)
- React Native core components
- Existing theme system (`src/utils/theme.ts`)
- Typography system (`src/components/atoms/Typography/`)
- Responsive utilities (`src/utils/responsiveSize.ts`)

### State Management
- No new Zustand stores required
- Use existing auth store for user information
- Local state management for audio processing status

### Styling & Theming
- Leverage existing theme colors and typography
- Use existing responsive size utilities
- Maintain consistent design language with current app

## Technical Considerations

### Performance
- Optimize home screen rendering with proper component structure
- Implement efficient audio processing intervals
- Use React.memo for static content components

### Accessibility
- Ensure proper accessibility labels for all interactive elements
- Maintain color contrast ratios from existing theme
- Support screen readers for educational content

### Responsive Design
- Use existing responsive utilities for different screen sizes
- Ensure proper spacing and typography scaling
- Test on various device sizes

## Implementation Phases

### Phase 1: Navigation Update (30 minutes)
- Update navigation types and remove emoji tab
- Test navigation flow

### Phase 2: Home Screen Redesign (2-3 hours)
- Implement new content structure
- Style with existing theme system
- Add interactive elements and proper spacing

### Phase 3: Audio Capture Enhancement (2-3 hours)
- Implement 3-second interval processing
- Add real-time status indicators
- Create backend integration structure

### Phase 4: Testing & Polish (1 hour)
- Test navigation flow
- Verify responsive design
- Polish animations and transitions

## Success Criteria

1. ✅ Navigation shows only 2 tabs: "Início" and "Gravar"
2. ✅ Home screen displays all required content sections
3. ✅ Logout button is completely removed
4. ✅ Audio capture screen processes audio every 3 seconds
5. ✅ UI is responsive and follows existing design system
6. ✅ All content is properly styled and accessible

## Notes

- This is a UI/UX focused feature with no native module requirements
- All changes are within the React Native layer
- Existing theme and component systems will be leveraged
- No backend integration is required for initial implementation (mock data can be used)
- The "Iniciar Escuta" button can navigate to the audio capture screen
