#!/usr/bin/env python3
import sys
from pathlib import Path

def main(): 
    dry_run = "--dry-run" in sys.argv
    base_dir = Path(__file__).parent.resolve()
    
    renamed_count = 0
    skipped_count = 0

    print(f"Scanning for .js files in: {base_dir}")
    if dry_run:
        print("🛑 DRY RUN MODE: No files will actually be renamed.\n")

    # Recursively find all .js files
    for file_path in base_dir.rglob('*.js'):
        # Skip hidden folders, node_modules, and .git
        if any(part.startswith('.') or part == 'node_modules' for part in file_path.parts):
            continue

        # Skip this script itself
        if file_path.name == Path(__file__).name:
            continue

        # Generate the new path with .jsx extension
        new_file_path = file_path.with_suffix('.jsx')

        # Prevent overwriting existing .jsx files
        if new_file_path.exists():
            print(f"️  Skipped: '{new_file_path.name}' already exists")
            skipped_count += 1
            continue

        # Rename the file
        if not dry_run:
            file_path.rename(new_file_path)
        
        status = "[DRY] " if dry_run else "✅ "
        print(f"{status}Renamed: {file_path.relative_to(base_dir)} -> {new_file_path.name}")
        renamed_count += 1

    print(f"\n🎉 Done! Renamed {renamed_count} files. (Skipped {skipped_count})")

if __name__ == "__main__":
    main()