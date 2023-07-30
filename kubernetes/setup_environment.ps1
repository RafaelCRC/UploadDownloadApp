Write-Host "Starting minikube..."
minikube start

Write-Host "Enabling ingress addons..."
minikube addons enable ingress


Write-Host "Applying the Kubernetes resources..."
kubectl apply -f namespace.yaml
kubectl apply -f service.yaml
kubectl apply -f deployment.yaml

Write-Host "Waiting for services to apply ingress rules..."
Start-Sleep -Seconds 60

kubectl apply -f ingress.yaml

Write-Host "Waiting for the Ingress IP to be assigned..."
Start-Sleep -Seconds 120

Write-Host "Mapping domain in hosts file..."
$INGRESS_IP = kubectl get ingress ingress-upload-download-app -n sample -o jsonpath="{.status.loadBalancer.ingress[0].ip}"


$hostsPath = "$env:SystemRoot\System32\drivers\etc\hosts"
Add-Content -Path $hostsPath -Value "$INGRESS_IP minikube-example.com"


Write-Host "Local Kubernetes cluster setup is complete. The application is accessible at http://minikube-example.com."