param([Switch] $Run=$false)

if (Test-Path ./static){
    remove-item ./static -recurse | Out-null
}
if(Test-Path ./templates){
    remove-item ./templates -recurse | Out-null
}
new-item -Type Directory ./templates | Out-null
cd site/analytics-workspace-mgmt
npm run build
cd ../..
copy-item ./site/analytics-workspace-mgmt/build/* ./templates
copy-item -recurse ./site/analytics-workspace-mgmt/build/static ./static

if($Run){
    uvicorn main:app
}