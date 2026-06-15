def generate_timeline_report(events):

    report = "DIGITAL FORENSICS TIMELINE\n\n"

    for event in events:

        report += (
            f"{event['time']}  -  "
            f"{event['event']}\n"
        )

    return report