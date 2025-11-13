# CV Download Feature Setup Guide

This guide will help you set up the CV download functionality in your portfolio.

## Step 1: Add Your CV File

1. **Prepare your CV:**
   - Save your CV as a PDF file
   - Name it `Simon_Sichilima_CV.pdf` (or update the filename in the code)
   - Ensure the file size is reasonable (under 5MB recommended)

2. **Add the CV to your project:**
   - Place your CV file in: `public/documents/Simon_Sichilima_CV.pdf`
   - Replace the placeholder file that's currently there

## Step 2: Update CV Information

Edit `src/lib/cvDownload.ts` and update the `getCVInfo()` function:

```typescript
export const getCVInfo = () => {
  return {
    fileName: 'Simon_Sichilima_CV.pdf',
    filePath: '/documents/Simon_Sichilima_CV.pdf',
    displayName: 'Simon Sichilima - CV',
    description: 'Software Engineer | Mobile & Front-End Developer Resume',
    lastUpdated: '2025-11-05' // Update this date when you update your CV
  };
};
```

## Step 3: Customize Download Button

The `CVDownloadButton` component accepts these props:

- `variant`: 'primary' | 'secondary' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `className`: Additional CSS classes
- `showIcon`: Boolean to show/hide download icon
- `children`: Button text content

Example usage:
```tsx
<CVDownloadButton 
  variant="primary" 
  size="lg" 
  className="my-custom-class"
>
  Get My Resume
</CVDownloadButton>
```

## Step 4: Analytics Tracking (Optional)

The download function includes analytics tracking. To enable:

1. **Google Analytics 4:**
   ```javascript
   // Add to your _app.js or layout.tsx
   gtag('config', 'GA_MEASUREMENT_ID');
   ```

2. **Custom Analytics:**
   - Edit the `downloadCV` function in `src/lib/cvDownload.ts`
   - Add your custom tracking code

## Step 5: Testing

1. **Test download functionality:**
   ```bash
   npm run dev
   ```
   
2. **Check browser console** for download events
3. **Verify file downloads** correctly
4. **Test on different devices** and browsers

## Step 6: Deployment

When deploying, ensure:

1. **CV file is included** in the build
2. **File paths are correct** for your hosting platform
3. **MIME types are configured** for PDF files
4. **HTTPS is enabled** for secure downloads

## File Structure

```
public/
  documents/
    Simon_Sichilima_CV.pdf          # Your actual CV file
src/
  components/
    CVDownloadButton.tsx            # Download button component
  lib/
    cvDownload.ts                   # Download utility functions
```

## Security Considerations

1. **File Size Limits:** Keep CV under 5MB
2. **File Validation:** Only allow PDF files
3. **Rate Limiting:** Consider implementing download limits
4. **Privacy:** Don't include sensitive information in URLs

## Customization Tips

1. **Multiple CV Versions:**
   - Create different CV files for different roles
   - Update the download function to accept a CV type parameter

2. **Download Counter:**
   - Add a counter to track total downloads
   - Display download stats in admin panel

3. **Email Integration:**
   - Send email notifications when CV is downloaded
   - Capture user email before allowing download

## Troubleshooting

**CV not downloading:**
- Check file exists in `public/documents/`
- Verify file permissions
- Check browser console for errors

**404 Error:**
- Ensure file path is correct
- Check if file was included in build
- Verify hosting configuration

**Download tracking not working:**
- Check analytics configuration
- Verify GA tracking ID
- Check browser console for tracking events

## SEO Benefits

The CV download feature helps with:
- **User Engagement:** Provides easy access to detailed information
- **Professional Credibility:** Shows preparedness and professionalism
- **Lead Generation:** Can track interest and follow up
- **Mobile Friendly:** Works across all devices