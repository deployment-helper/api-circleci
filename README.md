# mcrc-pipeline-create-circleci

# Development 
Nodejs10


# Deploy to Google Cloud
Deploy mcrc_pipeline_circleci = `gcloud functions deploy mcrc_pipeline_circleci --runtime nodejs10 --trigger-http --project multi-cloud-resource-creation`


Deploy mcrc_pipeline_circleci_variables = `gcloud functions deploy mcrc_pipeline_circleci_variables --runtime nodejs10 --trigger-http --project multi-cloud-resource-creation`