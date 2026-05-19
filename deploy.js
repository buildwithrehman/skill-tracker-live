const { execSync } = require('child_process');

try {
  console.log('Adding files...');
  execSync('git add .', { stdio: 'inherit' });
  
  console.log('Committing...');
  execSync('git commit -m "Finalizing app for production deployment" --no-verify --no-gpg-sign', { stdio: 'inherit' });
  
  console.log('Creating repo...');
  execSync('gh repo create skill-tracker-live --public --source=. --remote=live-origin', { stdio: 'inherit' });
  
  console.log('Pushing...');
  execSync('git push -u live-origin main', { stdio: 'inherit' });
  
  console.log('Done!');
} catch (error) {
  console.error('An error occurred:', error.message);
}
