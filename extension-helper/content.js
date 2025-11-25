// Content script for Focus Shield Helper extension

// Check if current site is blocked
(function() {
  // Don't run on the Focus Shield page itself
  if (window.location.pathname.includes('focus-shield.html')) {
    return;
  }
  
  // Check with the background script if this site should be blocked
  chrome.runtime.sendMessage({ action: 'checkBlocked' }, function(response) {
    if (response && response.blocked) {
      // This site is blocked, redirect to the Focus Shield page
      const focusShieldUrl = '/focus-shield.html?blocked=true&ext=1';
      
      // Save blocked site info to localStorage for the Focus Shield page
      try {
        localStorage.setItem('focusShield_isBlocked', 'true');
        localStorage.setItem('focusShield_blockedSite', window.location.hostname);
        localStorage.setItem('focusShield_task', response.sessionName || 'Focus Session');
        
        if (response.remaining) {
          const endTime = new Date(Date.now() + (response.remaining * 1000));
          localStorage.setItem('focusShield_endTime', endTime.toISOString());
        }
      } catch (e) {
        console.error('Error setting localStorage:', e);
      }
      
      // Redirect to Focus Shield
      window.location.replace(focusShieldUrl);
    }
  });
})();

// Listen for messages from Focus Shield webpage
window.addEventListener('message', function(event) {
  // Only accept messages from Focus Shield
  if (event.data && event.data.type === 'focusShield') {
    const request = event.data;
    
    // Forward request to extension background
    if (request.action === 'startBlocking' || request.action === 'stopBlocking') {
      chrome.runtime.sendMessage(request, function(response) {
        // Send response back to webpage
        window.postMessage({
          type: 'focusShieldResponse',
          requestId: request.requestId,
          success: true,
          data: response
        }, '*');
      });
    }
  }
});

// Inject script into page to facilitate communication
function injectCommunicationScript() {
  const script = document.createElement('script');
  script.textContent = `
    // Function to communicate with the extension
    window.focusShieldExt = {
      startBlocking: function(sites, duration, name) {
        return new Promise((resolve, reject) => {
          const requestId = Date.now().toString();
          
          // Wait for response
          const listener = function(event) {
            if (event.data && event.data.type === 'focusShieldResponse' && 
                event.data.requestId === requestId) {
              window.removeEventListener('message', listener);
              resolve(event.data.data);
            }
          };
          
          window.addEventListener('message', listener);
          
          // Send request
          window.postMessage({
            type: 'focusShield',
            action: 'startBlocking',
            sites: sites,
            duration: duration,
            name: name,
            requestId: requestId
          }, '*');
          
          // Timeout after 3 seconds
          setTimeout(() => {
            window.removeEventListener('message', listener);
            reject(new Error('Extension communication timed out'));
          }, 3000);
        });
      },
      
      stopBlocking: function() {
        return new Promise((resolve, reject) => {
          const requestId = Date.now().toString();
          
          // Wait for response
          const listener = function(event) {
            if (event.data && event.data.type === 'focusShieldResponse' && 
                event.data.requestId === requestId) {
              window.removeEventListener('message', listener);
              resolve(event.data.data);
            }
          };
          
          window.addEventListener('message', listener);
          
          // Send request
          window.postMessage({
            type: 'focusShield',
            action: 'stopBlocking',
            requestId: requestId
          }, '*');
          
          // Timeout after 3 seconds
          setTimeout(() => {
            window.removeEventListener('message', listener);
            reject(new Error('Extension communication timed out'));
          }, 3000);
        });
      }
    };
    
    // Dispatch event that extension is ready
    document.dispatchEvent(new CustomEvent('focusShieldExtensionReady'));
  `;
  
  // Add to DOM
  document.documentElement.appendChild(script);
  script.remove();
}

// Inject the communication script when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectCommunicationScript);
} else {
  injectCommunicationScript();
} 