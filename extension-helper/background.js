// Background script for Focus Shield Helper extension

// Store for active blocks
let activeBlocks = {
  sites: [],
  endTime: null,
  sessionName: ''
};

// Listen for messages from web pages (Focus Shield)
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    console.log("Message from Focus Shield:", request);
    
    if (request.action === 'checkExtension') {
      // Respond to check if extension is installed
      sendResponse({ installed: true, version: '1.0' });
      return true;
    }
    
    if (request.action === 'startBlocking') {
      // Start blocking websites
      activeBlocks.sites = request.sites || [];
      activeBlocks.sessionName = request.name || 'Focus Session';
      
      // Calculate end time
      if (request.duration) {
        const endTime = Date.now() + (request.duration * 1000);
        activeBlocks.endTime = endTime;
      }
      
      // Try to integrate with BlockSite
      tryBlockSiteIntegration(activeBlocks.sites, request.duration, activeBlocks.sessionName);
      
      sendResponse({ success: true });
      return true;
    }
    
    if (request.action === 'stopBlocking') {
      // Stop blocking all sites
      const oldSites = [...activeBlocks.sites];
      activeBlocks.sites = [];
      activeBlocks.endTime = null;
      
      // Try to stop BlockSite blocking
      tryStopBlockSiteIntegration();
      
      sendResponse({ success: true, previouslySites: oldSites });
      return true;
    }
    
    if (request.action === 'getStatus') {
      // Return current blocking status
      sendResponse({
        active: activeBlocks.sites.length > 0,
        sites: activeBlocks.sites,
        remaining: activeBlocks.endTime ? Math.max(0, Math.floor((activeBlocks.endTime - Date.now()) / 1000)) : null,
        sessionName: activeBlocks.sessionName
      });
      return true;
    }
  }
);

// Attempt to integrate with BlockSite
function tryBlockSiteIntegration(sites, duration, name) {
  try {
    chrome.runtime.sendMessage('eiimnmioipafcokbfikbljfdeojpcgbh', {
      action: 'block',
      sites: sites,
      duration: duration,
      name: name
    }, function(response) {
      console.log('BlockSite response:', response);
    });
  } catch (e) {
    console.log('BlockSite integration failed:', e);
  }
}

// Attempt to stop BlockSite integration
function tryStopBlockSiteIntegration() {
  try {
    chrome.runtime.sendMessage('eiimnmioipafcokbfikbljfdeojpcgbh', {
      action: 'unblock'
    }, function(response) {
      console.log('BlockSite unblock response:', response);
    });
  } catch (e) {
    console.log('BlockSite unblock failed:', e);
  }
}

// Content script messaging
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'checkBlocked') {
    // Check if the current site is blocked
    if (activeBlocks.sites.length > 0 && sender.tab && sender.tab.url) {
      const url = new URL(sender.tab.url);
      const hostname = url.hostname;
      
      const isBlocked = activeBlocks.sites.some(site => 
        hostname === site || hostname.endsWith('.' + site)
      );
      
      if (isBlocked) {
        sendResponse({ 
          blocked: true, 
          sessionName: activeBlocks.sessionName,
          remaining: activeBlocks.endTime ? Math.max(0, Math.floor((activeBlocks.endTime - Date.now()) / 1000)) : null
        });
        return true;
      }
    }
    
    sendResponse({ blocked: false });
    return true;
  }
}); 