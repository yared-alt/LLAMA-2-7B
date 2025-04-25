# Llama 2 Project

## Overview
This project implements the Llama 2 language model, a state-of-the-art large language model developed by Meta AI.

## System Requirements

### Minimum Requirements
- **CPU**: 4 cores, 2.5 GHz or higher
- **RAM**: 16GB
- **Storage**: 50GB free space
- **GPU**: NVIDIA GPU with 8GB VRAM (for GPU acceleration)
- **Operating System**: Windows 10/11, Linux, or macOS

### Recommended Requirements
- **CPU**: 8 cores, 3.0 GHz or higher
- **RAM**: 32GB
- **Storage**: 100GB free space
- **GPU**: NVIDIA GPU with 16GB+ VRAM
- **Operating System**: Windows 10/11, Linux, or macOS

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yared-alt/Host-LLAMA-2-7b-AI.git
cd Host-LLAMA-2-7b-AI
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

1. Configure your environment variables in `.env` file
2. Run the model:
```bash

```

## Model Specifications

- Model Size: 7B/13B/70B parameters (depending on version)
- Context Length: 4096 tokens
- Training Data: Publicly available text data
- License: Custom Meta AI License

## Performance Considerations

- Memory Usage:
  - 7B model: ~14GB RAM
  - 13B model: ~26GB RAM
  - 70B model: ~140GB RAM

- GPU Requirements:
  - 7B model: 8GB VRAM minimum
  - 13B model: 16GB VRAM minimum
  - 70B model: 80GB VRAM minimum

## Supported Features

- Text generation
- Chat completion
- Code completion
- Instruction following
- Multi-turn conversations

## Limitations

- Maximum context length: 4096 tokens
- May require significant computational resources
- Performance depends on hardware specifications

