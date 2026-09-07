"""Expand shared HTML fragments into static pages before deployment."""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
TEMPLATES = ROOT / "templates"
PAGES = [
    ROOT / "index.html",
    ROOT / "transporte/index.html",
    ROOT / "rental/index.html",
    ROOT / "mecanica/index.html",
    ROOT / "contacto/index.html",
    ROOT / "empleos/index.html",
    ROOT / "gracias/index.html",
]


def replace_block(page: str, name: str, content: str) -> str:
    pattern = re.compile(
        rf"<!-- build:{name} -->.*?<!-- /build:{name} -->",
        re.DOTALL,
    )
    replacement = f"<!-- build:{name} -->\n{content.rstrip()}\n<!-- /build:{name} -->"
    updated, count = pattern.subn(replacement, page, count=1)
    if count != 1:
        raise ValueError(f"Missing or duplicated {name} markers")
    return updated


def main() -> None:
    fragments = {
        "header": (TEMPLATES / "header.html").read_text(encoding="utf-8"),
        "footer": (TEMPLATES / "footer.html").read_text(encoding="utf-8"),
    }
    for path in PAGES:
        page = path.read_text(encoding="utf-8")
        page = replace_block(page, "header", fragments["header"])
        page = replace_block(page, "footer", fragments["footer"])
        path.write_text(page, encoding="utf-8", newline="\n")
        print(f"Updated {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
