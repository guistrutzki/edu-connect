# Feature Plan - Recording Screen Dual Lists Implementation

## Context & Integration

This feature involves redesigning the audio recording screen to display two distinct lists as shown in the provided image: a **vertical list for real-time transcription text** and a **horizontal list for visual representations** (illustrations and texts) returned from the API. This is a **Pure React Native implementation** that requires creating new API services and state management for real-time audio processing.

### Current State Analysis
- `AudioCaptureScreen.tsx` exists with basic recording functionality and mock data processing
- No API service layer exists - current implementation uses simulated 3-second interval processing
- Current UI shows processing chunks in a vertical list format
- No real-time transcription display or visual representation components

### Target State
- **Vertical List**: Real-time transcription text that updates as audio is processed
- **Horizontal List**: Visual representations (emojis, illustrations, text) returned from API
- **Cancel Recording Button**: Always visible during recording state
- **Real-time Processing**: Integration with backend API for actual audio-to-text and visual representation generation

## File & Function Mapping

### 1. React Native Components & Screens
**Files to modify:**
- `src/screens/Main/AudioCaptureScreen.tsx` - Complete redesign with dual list layout
- `src/components/atoms/` - Create new components for transcription and visual representation lists

**New components to create:**
- `src/components/atoms/TranscriptionList/` - Vertical list for real-time text
- `src/components/atoms/VisualRepresentationList/` - Horizontal scrollable list for API results
- `src/components/atoms/RecordingControls/` - Recording start/stop/cancel buttons

### 2. State Management & Services
**Files to create:**
- `src/store/audioStore.ts` - Zustand store for audio recording state and transcription data
- `src/services/audioService.ts` - Audio recording and processing service
- `src/services/apiService.ts` - Backend API communication service
- `src/types/audio.types.ts` - TypeScript interfaces for audio and transcription data

### 3. API Integration Layer
**New service structure:**
```
src/services/
├── audioService.ts           # Audio recording with expo-av
├── apiService.ts             # Backend communication
└── transcriptionService.ts   # Real-time transcription processing
```

**API Endpoint Integration:**
- `POST /api/audio` - Send audio chunks for processing
- Response format: `{ text: string, content_emojis: Array<{emoji: string, content: string}>, confidence: number }`

### 4. Dependencies & Integration
**New dependencies required:**
- `expo-av` - Audio recording functionality
- `expo-file-system` - File handling for audio chunks
- `react-native-flatlist` - Optimized list rendering (if not already available)

**Existing dependencies to leverage:**
- `zustand` - State management for recording state and transcription data
- `@react-navigation/native` - Navigation integration
- `expo-linear-gradient` - Background styling

## Implementation Details

### 1. Audio Recording Service (`src/services/audioService.ts`)
**Functions to implement:**
- `startRecording()` - Initialize audio recording with expo-av
- `stopRecording()` - Stop recording and return audio file
- `processAudioChunk(audioFile: File)` - Send audio to backend API
- `getRecordingStatus()` - Return current recording state

### 2. API Service (`src/services/apiService.ts`)
**Functions to implement:**
- `processAudio(audioFile: File)` - Send audio to backend for transcription
- `getTranscriptionResult(chunkId: string)` - Poll for transcription results
- Error handling and retry logic for API failures

### 3. Audio Store (`src/store/audioStore.ts`)
**State structure:**
```typescript
interface AudioState {
  isRecording: boolean
  transcriptionText: string
  visualRepresentations: VisualRepresentation[]
  processingStatus: 'idle' | 'recording' | 'processing' | 'completed' | 'error'
  currentChunkId: number
  startRecording: () => void
  stopRecording: () => void
  cancelRecording: () => void
  updateTranscription: (text: string) => void
  addVisualRepresentation: (representation: VisualRepresentation) => void
}
```

### 4. UI Component Structure
**TranscriptionList Component:**
- Vertical scrollable list
- Real-time text updates
- Auto-scroll to bottom as new text arrives
- Visual indicator for live transcription status

**VisualRepresentationList Component:**
- Horizontal scrollable list
- Card-based layout for each representation
- Support for emoji, text, and illustration display
- Smooth animations for new items

**RecordingControls Component:**
- Start/Stop recording button
- Cancel recording button (always visible during recording)
- Recording status indicator
- Processing status display

### 5. Real-time Processing Flow
**Implementation sequence:**
1. User clicks "Iniciar Gravação"
2. Audio recording starts with expo-av
3. Every 3 seconds: audio chunk is sent to backend API
4. Backend processes audio → returns transcription + visual representations
5. Frontend updates vertical list with new transcription text
6. Frontend adds new items to horizontal visual representation list
7. User can cancel recording at any time
8. Final processing when recording stops

### 6. Error Handling & Edge Cases
**Scenarios to handle:**
- Network connectivity issues during recording
- API timeout or failure
- Audio recording permissions
- Background/foreground app state changes
- Memory management for long recordings

## Phased Implementation

### **Phase 1 - Foundation & Services**
- Create audio service with expo-av integration
- Implement API service for backend communication
- Set up Zustand store for audio state management
- Create TypeScript interfaces for all data structures

### **Phase 2 - UI Components**
- Build TranscriptionList component with real-time updates
- Build VisualRepresentationList component with horizontal scrolling
- Create RecordingControls component with cancel functionality
- Implement responsive layout matching the provided image

### **Phase 3 - Integration & Real-time Processing**
- Integrate audio service with UI components
- Implement 3-second chunk processing with API calls
- Add real-time transcription text updates
- Implement visual representation list updates from API responses

### **Phase 4 - Polish & Error Handling**
- Add loading states and error handling
- Implement proper cleanup for audio recording
- Add accessibility features for screen readers
- Performance optimization for long recording sessions

## Technical Requirements

### **Audio Processing:**
- Use expo-av for audio recording
- Implement 3-second chunk processing
- Support for background recording
- Proper audio file format handling (WAV/MP3)

### **API Integration:**
- RESTful API communication with backend
- Multipart form data for audio file upload
- Polling mechanism for transcription results
- Error handling and retry logic

### **UI/UX Requirements:**
- Match the exact layout from the provided image
- Smooth animations for list updates
- Responsive design for different screen sizes
- Accessibility support for users with disabilities

### **Performance Considerations:**
- Efficient list rendering with FlatList
- Memory management for audio chunks
- Debounced API calls to prevent spam
- Background processing without blocking UI

## Success Criteria

1. **Functional Requirements:**
   - Real-time transcription text appears in vertical list as audio is processed
   - Visual representations appear in horizontal list from API responses
   - Cancel recording button is always visible during recording
   - 3-second interval processing works correctly

2. **UI/UX Requirements:**
   - Layout matches the provided image exactly
   - Smooth scrolling and animations
   - Responsive design across devices
   - Clear visual feedback for all states

3. **Technical Requirements:**
   - Proper error handling for network issues
   - Memory efficient for long recording sessions
   - Accessible for users with disabilities
   - Integration with existing navigation and state management
