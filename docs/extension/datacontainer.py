from sphinx.util.docutils import SphinxDirective
from docutils import nodes
from docutils.parsers.rst import directives
import re


def parse_data_attributes(argument):
    """Parse space-separated key=value pairs."""
    if not argument:
        return {}

    result = {}
    # Match key=value patterns
    for match in re.finditer(r"([^\s=]+)=([^\s]+)", argument):
        key, value = match.groups()
        result[key] = value
    return result


class DataContainerNode(nodes.General, nodes.Element):
    """
    Custom node that ensures data attributes are preserved in HTML output

    Output example:
    <div class="container docutils" data-os="ubuntu" data-gpu="instinct">
        Hello world!
    </div>
    """

    pass


def visit_datacontainer_html(self, node):
    """Custom HTML visitor for the data container"""
    attrs = {}
    for key, value in node.attributes.items():
        if key.startswith("data-"):
            attrs[key] = value

    self.body.append(self.starttag(node, "div", **attrs))


def depart_datacontainer_html(self, node):
    """Custom HTML departure for the data container"""
    self.body.append("</div>")


class DataContainer(SphinxDirective):
    """
    A directive that creates a div with data attributes.
    """

    has_content = True
    required_arguments = 0
    optional_arguments = 100
    final_argument_whitespace = True
    option_spec = {
        "class": directives.class_option,
        "name": directives.unchanged,
        "data": parse_data_attributes,
    }

    def run(self):
        node = DataContainerNode()  # Use our custom node
        self.set_source_info(node)

        # Process class names
        classes = self.arguments
        if "class" in self.options:
            classes.extend(self.options["class"])
        node["classes"] = classes

        # Set the document ID
        self.add_name(node)

        # Process data attributes
        if "data" in self.options:
            for key, value in self.options["data"].items():
                if key == "id":
                    node["ids"] = [value]
                else:
                    node[f"data-{key}"] = value  # Add data- prefix

        # Parse nested content
        self.state.nested_parse(self.content, self.content_offset, node)

        return [node]


def setup(app):
    app.add_node(
        DataContainerNode, html=(visit_datacontainer_html, depart_datacontainer_html)
    )
    app.add_directive("datacontainer", DataContainer)

    return {
        "version": "1.0",
        "parallel_read_safe": True,
        "parallel_write_safe": True,
    }
