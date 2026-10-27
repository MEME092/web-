import os
import zipfile

IGNORED_DIR_NAMES = {'node_modules', '.git', 'dist', '.cache', '__pycache__', 'skills', '.aistudio'}

def create_project_zip(output_path):
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    if os.path.exists(output_path):
        os.remove(output_path)
    
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(root_dir):
            # Exclude ignored directories in-place
            dirs[:] = [d for d in dirs if d not in IGNORED_DIR_NAMES and not d.startswith('.')]
            
            # Check if any parent part of root is in ignored dirs
            rel_root = os.path.relpath(root, root_dir)
            parts = rel_root.split(os.sep)
            if any(p in IGNORED_DIR_NAMES or (p.startswith('.') and p != '.') for p in parts):
                continue

            for file in files:
                if file.endswith('.zip') or file.endswith('.pyc') or file == '.DS_Store':
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, root_dir)
                zipf.write(full_path, rel_path)
    
    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"Project ZIP created cleanly at: {output_path} ({size_mb:.2f} MB)")

if __name__ == '__main__':
    create_project_zip(os.path.abspath('thread-and-petal-project.zip'))
