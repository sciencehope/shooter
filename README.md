<p align="center"> <a href="https://opensource.org/license/agpl-v3"> <img src="https://img.shields.io/badge/License-AGPL_v3-blue.svg?color=3F51B5&style=for-the-badge&label=License&logoColor=000000&labelColor=ececec" alt="License: AGPLv3"> </a> <a href="https://discord.gg/yourdiscordlink"> <img src="https://img.shields.io/discord/yourdiscordid.svg?label=Community&logo=Discord&style=for-the-badge&logoColor=000000&labelColor=ececec" alt="Discord"/> </a> </p> <p align="center"> <img src="design/immich-logo-stacked-light.svg" width="300" title="Shooter Logo"> </p> 

<h3 align="center">Shooter — Self-hosted photo and video management platform</h3>
📖 Overview

Shooter is a self-hosted high-performance photo and video management solution, enabling individuals and teams to securely store, organize, and explore their media library.

Shooter was originally based on Immich v2.2.0
 and has been extensively modified with new branding, UI customization, and additional configuration improvements.

⚙️ Features
Features	Mobile	Web
Upload and view videos and photos	Yes	Yes
Prevent duplication of assets	Yes	Yes
Album and shared albums	Yes	Yes
Metadata view (EXIF, map)	Yes	Yes
Search by metadata, objects, faces, and CLIP	Yes	Yes
Administrative functions	Yes	Yes
Facial recognition and clustering	Yes	Yes
Global Map	Yes	Yes
Archive, Favorites, and Tags	Yes	Yes
Public sharing	Yes	Yes
🧰 Powered By

Shooter integrates the following open-source technologies:

Node.js

FFmpeg

ExifTool

Libvips

SvelteKit

PostgreSQL

Redis

💾 Installation

Run using Docker Compose:

docker compose \
  -f docker/docker-compose.yml \
  -f docker/docker-compose.override.yml \
  -f docker/docker-compose.db.override.yml \
  up -d


Then visit:

http://localhost:2283

⚖️ License and Attribution

Shooter © 2025 ScienceHope.
Released under the GNU Affero General Public License v3.0 (AGPL-3.0).
Source code available at github.com/sciencehope/shooter
.

This project is based on Immich v2.2.0 (© Immich App Contributors)
and includes modified portions of the original Immich source code.
All Immich-derived content remains licensed under the AGPL-3.0.
Shooter developers gratefully acknowledge the Immich community and the authors of all open-source dependencies used in this project.

📡 Links

Documentation (WIP)

Docker Hub

Releases

Issues