# Setting up Kubernetes Cluster with Ingress Controller

This documentation will guide you through the process of setting up a Kubernetes cluster with an Ingress controller to deploy and access the application.

- [Script Setup](script-setup)
- [Manual Setup](manual-setup)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

1. Minikube [Install Minikube](https://minikube.sigs.k8s.io/docs/start/)
2. kubectl [install kubectl](https://kubernetes.io/docs/tasks/tools/) (if not packaged together with minikube)

Now Navigate to Kubernetes Folder in the repository.

# Script Setup

## Setup on Windows

Open Windows PowerShell as an administrator

Make sure you enable scripts in powershell by running the following command:

```bash
Set-ExecutionPolicy RemoteSigned
```

Then execute the script:

```bash
.\setup_environment.ps1
```

!!!keep the terminal open!!!

## Setup on Unix

Open any terminal.


Then execute the script:

```bash
./setup_environment.sh
```

!!!keep the terminal open!!!

# Manual Setup

start Minikube by running the command:

```bash
minikube start
```

install ingress addons by running the command:

```bash
minikube addons enable ingress
```

and

```bash
minikube addons enable ingress-dns
```


# Prepare YAML Files

Make sure you have the following YAML files ready:

- namespace.yaml: Specifies the Kubernetes namespace for the application.
- service.yaml: Defines the Kubernetes service for the application.
- deployment.yaml: Specifies the deployment configuration for the application.
- ingress.yaml: Defines the Ingress rules for routing external traffic to the application.

# Apply YAML Files

1. Open a terminal or command prompt.
2. Navigate to the Kubernetes folder containing the YAML files.
3. Apply the namespace, service, deployment, and ingress configurations using the following commands:

```bash
kubectl apply -f namespace.yaml
kubectl apply -f service.yaml
kubectl apply -f deployment.yaml
kubectl apply -f ingress.yaml
```

# Verify Ingress Address

Wait for the Ingress controller to generate an external IP address for your application. You can check the status of the Ingress using the following command:

```bash
kubectl get ingress -n sample
```
# Update Hosts File

Once you have the Ingress address, update your computer's hosts file with the domain and Ingress address to map the domain to the Kubernetes cluster. On Unix-like systems, you can do this by editing the /etc/hosts file:

```bash
sudo nano /etc/hosts
```

Add the following line at the end of the file:

```bash
127.0.0.1 minikube-example.com
```

# Run minikube tunnel

```bash
minikube tunnel
```

# Access the Application

Now, you should be able to access the "UploadDownloadApp" application using the domain minikube-example.com. Open your web browser or Postman to access the application.
