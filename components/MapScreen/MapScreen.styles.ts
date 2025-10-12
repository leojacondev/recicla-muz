import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  fallbackInfo: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  fallbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 8,
  },
  fallbackCoords: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  infoOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 5,
  },
  coordinates: {
    fontSize: 12,
    color: '#666',
  },
  pointsCount: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 5,
  },
  callout: {
    width: 250,
    minHeight: 120,
  },
  calloutContainer: {
    padding: 12,
    alignItems: 'flex-start',
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5016',
    marginBottom: 6,
  },
  calloutDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  wasteTypesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  wasteTypeEmoji: {
    fontSize: 18,
    marginRight: 4,
  },
  moreTypes: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  viewButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});