#!/bin/bash

echo "Starting minikube..."
minikube start

echo "Enabling ingress addons..."
minikube addons enable ingress

echo "Applying the Kubernetes resources..."
kubectl apply -f namespace.yaml
kubectl apply -f service.yaml
kubectl apply -f deployment.yaml

echo "Waiting for services to apply ingress rules..."
sleep 60

kubectl apply -f ingress.yaml

echo "Waiting for the Ingress IP to be assigned..."
sleep 120

echo "Mapping domain in hosts file..."
INGRESS_IP=$(kubectl get ingress ingress-upload-download-app -n sample -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
echo "$INGRESS_IP minikube-example.com" | sudo tee -a /etc/hosts


echo "Local Kubernetes cluster setup is complete. The application is accessible at http://minikube-example.com."