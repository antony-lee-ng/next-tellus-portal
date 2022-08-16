#!/bin/bash

# Remove old export
rm -rf export

# Outdir
mkdir -p export

# Copy folders/files
cp -r dist/ export
cp -r .next/ export
cp -r public/ export

cp -r .env.local export
cp -r package.json export

# Install files
cd export
yarn install --production
